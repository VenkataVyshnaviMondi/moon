import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { chromium, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const baseURL = process.env.VERIFY_URL || 'http://127.0.0.1:4173';
const output = resolve('.impeccable/review');
const services = ['Branding', 'Social Media Marketing', 'Web Designing', 'IT Solutions', 'Google Ads', 'Meta Ads', 'Zoho Projects', 'YouTube Marketing'];
const report = {
  generatedAt: new Date().toISOString(), baseURL,
  checks: [], accessibility: [], responsive: [], runtime: { consoleErrors: [], pageErrors: [], failedRequests: [], failedResponses: [] },
  performance: null,
  limitations: ['Local Chromium laboratory checks are not field Core Web Vitals.', 'One throttled sample is indicative, not a guarantee. Event Timing from a synthetic menu interaction is not field INP.', 'External social profiles and mail delivery are not exercised; no email is sent.'],
};
await mkdir(output, { recursive: true });

async function check(name, action) {
  try {
    const detail = await action();
    report.checks.push({ name, passed: true, ...(detail === undefined ? {} : { detail }) });
    console.log(`PASS ${name}`);
  } catch (error) {
    report.checks.push({ name, passed: false, error: error instanceof Error ? error.message : String(error) });
    console.error(`FAIL ${name}: ${error.message || error}`);
  }
}

function track(page, label) {
  page.on('console', message => { if (message.type() === 'error') report.runtime.consoleErrors.push({ label, message: message.text() }); });
  page.on('pageerror', error => report.runtime.pageErrors.push({ label, message: error.message }));
  page.on('requestfailed', request => report.runtime.failedRequests.push({ label, url: request.url(), error: request.failure()?.errorText }));
  page.on('response', response => { if (response.status() >= 400) report.runtime.failedResponses.push({ label, url: response.url(), status: response.status() }); });
}

async function settle(page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    await new Promise(done => requestAnimationFrame(() => requestAnimationFrame(done)));
  });
}

async function loadImages(page) {
  for (const image of await page.locator('img').all()) {
    await image.scrollIntoViewIfNeeded();
    await expect(image).toHaveJSProperty('complete', true);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await settle(page);
}

async function scanAxe(page, label) {
  const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
  const violations = result.violations.map(({ id, impact, description, helpUrl, nodes }) => ({ id, impact, description, helpUrl, nodes: nodes.map(({ target, failureSummary }) => ({ target, failureSummary })) }));
  report.accessibility.push({ label, rulesPassed: result.passes.length, incompleteRules: result.incomplete.map(({ id, nodes }) => ({ id, elements: nodes.map(node => node.target) })), violations });
  expect(violations, `${label}: axe accessibility violations`).toEqual([]);
}

let browser;
try {
  browser = await chromium.launch({ headless: true });

  await check('Production HTML includes readable essential content without JavaScript', async () => {
    const html = await readFile(resolve('dist/index.html'), 'utf8');
    expect(html).toMatch(/<h1[\s>]/);
    expect(html).toContain('Grow your brand.');
    expect(html).toContain('digital future.');
    for (const service of services) expect(html).toContain(service);
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 1000 } });
    try {
      const page = await context.newPage(); track(page, 'no-js');
      await page.goto(baseURL, { waitUntil: 'load' });
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await expect(page.getByRole('link', { name: /Explore Our Services/i })).toBeVisible();
      await expect(page.getByRole('link', { name: /Let.s Talk/i }).first()).toBeVisible();
      for (const service of services) await expect(page.locator('#services').getByRole('heading', { name: service, exact: true })).toBeAttached();
      return { h1: await page.locator('h1').innerText(), services: services.length };
    } finally { await context.close(); }
  });

  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
  const page = await context.newPage(); track(page, 'functional');
  await page.goto(baseURL, { waitUntil: 'networkidle' });
  await settle(page);

  await check('All internal anchor links resolve and external links use valid URLs', async () => {
    const result = await page.locator('a[href]').evaluateAll(links => links.map(link => {
      const url = new URL(link.href, location.href);
      return { href: link.getAttribute('href'), text: link.textContent.trim(), internal: url.origin === location.origin && url.pathname === location.pathname && Boolean(url.hash), validTarget: !url.hash || Boolean(document.getElementById(decodeURIComponent(url.hash.slice(1)))), protocol: url.protocol };
    }));
    expect(result.filter(link => link.internal && !link.validTarget), 'Broken hash targets').toEqual([]);
    expect(result.filter(link => !['http:', 'https:', 'mailto:', 'tel:'].includes(link.protocol)), 'Unexpected URL protocols').toEqual([]);
    return { links: result.length, internalAnchors: result.filter(link => link.internal).length, externalNetworkLinksNotRequested: true };
  });

  await check('Images load and declare explicit intrinsic dimensions', async () => {
    await loadImages(page);
    const images = await page.locator('img').evaluateAll(elements => elements.map(image => ({ src: image.currentSrc, complete: image.complete, naturalWidth: image.naturalWidth, width: image.getAttribute('width'), height: image.getAttribute('height'), loading: image.loading })));
    expect(images.filter(image => !image.complete || image.naturalWidth === 0 || !(Number(image.width) > 0) || !(Number(image.height) > 0))).toEqual([]);
    return images;
  });

  for (const width of [360, 390, 768, 1440]) {
    await check(`Responsive layout fits a ${width}px viewport`, async () => {
      await page.setViewportSize({ width, height: width >= 768 ? 1000 : 844 });
      await page.evaluate(() => window.scrollTo(0, 0));
      await settle(page);
      const size = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth, overflowElements: Array.from(document.querySelectorAll('body *')).filter(element => {
        const bounds = element.getBoundingClientRect(); return bounds.width > 0 && (bounds.right > innerWidth + 1 || bounds.left < -1);
      }).slice(0, 12).map(element => ({ tag: element.tagName, class: element.className?.baseVal ?? element.className, id: element.id })) }));
      report.responsive.push({ width, ...size });
      expect(size.scroll, JSON.stringify(size)).toBeLessThanOrEqual(size.viewport + 1);
      await expect(page.locator('h1')).toBeVisible();
      if (width === 1440 || width === 390 || width === 768) await page.screenshot({ path: resolve(output, width === 1440 ? 'desktop.png' : width === 390 ? 'mobile.png' : 'tablet.png'), fullPage: true, animations: 'disabled' });
      return size;
    });
  }

  await check('Desktop WCAG 2 A/AA and WCAG 2.1 AA axe scan', async () => {
    await page.setViewportSize({ width: 1440, height: 1000 }); await settle(page); await scanAxe(page, 'desktop');
  });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await check('Mobile navigation opens and passes axe with menu open', async () => {
    const toggle = page.getByRole('button', { name: 'Open navigation', exact: true });
    await toggle.click();
    await expect(page.getByRole('button', { name: 'Close navigation', exact: true })).toHaveAttribute('aria-expanded', 'true');
    await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
    await scanAxe(page, 'mobile-menu-open');
  });
  await check('Escape closes the mobile menu and returns keyboard focus', async () => {
    await page.keyboard.press('Escape');
    const toggle = page.getByRole('button', { name: 'Open navigation', exact: true });
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(toggle).toBeFocused();
  });
  await check('Mobile navigation closes after choosing a section', async () => {
    await page.getByRole('button', { name: 'Open navigation', exact: true }).click();
    await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Services', exact: true }).click();
    await expect(page.getByRole('button', { name: 'Open navigation', exact: true })).toHaveAttribute('aria-expanded', 'false');
    await expect(page).toHaveURL(/#services$/);
  });
  await check('Mobile WCAG 2 A/AA and WCAG 2.1 AA axe scan with menu closed', async () => { await scanAxe(page, 'mobile-menu-closed'); });

  const form = page.getByRole('form', { name: 'Project enquiry' });
  await check('Choosing a service preselects it in the contact form', async () => {
    await page.locator('.service-card').filter({ has: page.getByRole('heading', { name: 'Google Ads', exact: true }) }).click();
    await expect(form.locator('select[name="service"]')).toHaveValue('Google Ads');
    await expect(page).toHaveURL(/#contact$/);
  });

  const submissionRequests = [];
  // Never send a real submission while verifying the default email-draft flow.
  await page.route('**/*', async route => {
    if (!['GET', 'HEAD', 'OPTIONS'].includes(route.request().method())) {
      submissionRequests.push({ method: route.request().method(), url: route.request().url() });
      await route.abort('blockedbyclient');
    } else await route.continue();
  });
  await check('Invalid enquiries do not create an email draft', async () => {
    await form.getByRole('button', { name: 'Prepare enquiry email' }).click();
    expect(await form.evaluate(element => element.checkValidity())).toBe(false);
    await expect(form.getByRole('link', { name: /Open email app to send/ })).toHaveCount(0);
    await form.locator('[name="fullName"]').fill('Website Review');
    await form.locator('[name="email"]').fill('invalid-email');
    await form.locator('[name="goals"]').fill('We would like to discuss a website and marketing project.');
    await form.getByRole('button', { name: 'Prepare enquiry email' }).click();
    await expect(form.getByRole('link', { name: /Open email app to send/ })).toHaveCount(0);
    expect(submissionRequests).toEqual([]);
  });
  await check('A valid enquiry creates an honest, unsent mailto draft without network submission', async () => {
    await form.locator('[name="email"]').fill('review@example.com');
    await form.getByRole('button', { name: 'Prepare enquiry email' }).click();
    const draft = form.getByRole('link', { name: /Open email app to send/ });
    await expect(draft).toBeVisible();
    const href = await draft.getAttribute('href');
    const url = new URL(href);
    expect(url.protocol).toBe('mailto:');
    expect(url.pathname).toBe('mooncrafters@gmail.com');
    expect(url.searchParams.get('subject')).toContain('Google Ads');
    expect(url.searchParams.get('body')).toContain('review@example.com');
    await expect(form.getByRole('status')).toContainText('No enquiry has been sent yet');
    expect(submissionRequests).toEqual([]);
    return { recipient: url.pathname, selectedService: 'Google Ads', networkSubmissions: submissionRequests.length, emailSent: false };
  });
  await context.close();

  await check('Cold mobile laboratory performance sample', async () => {
    const perfContext = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, reducedMotion: 'no-preference' });
    try {
      await perfContext.addInitScript(() => {
        window.__siteMetrics = { lcp: null, cls: 0, events: [], longTasks: [] };
        try { new PerformanceObserver(list => { for (const entry of list.getEntries()) window.__siteMetrics.lcp = { milliseconds: entry.startTime, size: entry.size, url: entry.url || null, element: entry.element?.tagName || null }; }).observe({ type: 'largest-contentful-paint', buffered: true }); } catch {}
        try { new PerformanceObserver(list => { for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.__siteMetrics.cls += entry.value; }).observe({ type: 'layout-shift', buffered: true }); } catch {}
        try { new PerformanceObserver(list => { for (const entry of list.getEntries()) window.__siteMetrics.events.push({ name: entry.name, duration: entry.duration, interactionId: entry.interactionId, startTime: entry.startTime }); }).observe({ type: 'event', durationThreshold: 16, buffered: true }); } catch {}
        try { new PerformanceObserver(list => { for (const entry of list.getEntries()) window.__siteMetrics.longTasks.push({ startTime: entry.startTime, duration: entry.duration }); }).observe({ type: 'longtask', buffered: true }); } catch {}
      });
      const perfPage = await perfContext.newPage(); track(perfPage, 'mobile-performance');
      const cdp = await perfContext.newCDPSession(perfPage);
      await cdp.send('Network.enable');
      await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
      await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: 1600000 / 8, uploadThroughput: 750000 / 8, connectionType: 'cellular3g' });
      await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
      let transferredBytes = 0; let requestCount = 0;
      cdp.on('Network.loadingFinished', event => { transferredBytes += event.encodedDataLength; });
      cdp.on('Network.requestWillBeSent', () => { requestCount += 1; });
      await perfPage.goto(baseURL, { waitUntil: 'networkidle', timeout: 60000 });
      await settle(perfPage);
      await perfPage.waitForTimeout(1200);
      const beforeInteraction = await perfPage.evaluate(() => ({ ...window.__siteMetrics, navigation: performance.getEntriesByType('navigation')[0]?.toJSON(), resources: performance.getEntriesByType('resource').map(entry => ({ name: entry.name, type: entry.initiatorType, transferSize: entry.transferSize, encodedBodySize: entry.encodedBodySize, decodedBodySize: entry.decodedBodySize, duration: entry.duration })) }));
      const initialTransferredBytes = transferredBytes; const initialRequests = requestCount;
      await perfPage.getByRole('button', { name: 'Open navigation', exact: true }).click();
      await perfPage.waitForTimeout(350);
      const afterInteraction = await perfPage.evaluate(() => window.__siteMetrics);
      const observedEvents = afterInteraction.events.filter(entry => entry.interactionId > 0);
      report.performance = {
        environment: { browser: await browser.version(), viewport: '390x844', deviceScaleFactor: 2, cpuSlowdown: 4, latencyMs: 150, downloadBitsPerSecond: 1600000, uploadBitsPerSecond: 750000, cacheDisabled: true },
        lcp: beforeInteraction.lcp, clsBeforeInteraction: beforeInteraction.cls, clsAfterMenuInteraction: afterInteraction.cls,
        initialTransferredBytes, initialRequests,
        timingTransferBytes: (beforeInteraction.navigation?.transferSize || 0) + beforeInteraction.resources.reduce((total, resource) => total + resource.transferSize, 0),
        navigation: beforeInteraction.navigation,
        javascript: beforeInteraction.resources.filter(resource => /\.m?js(?:\?|$)/.test(resource.name)),
        stylesheets: beforeInteraction.resources.filter(resource => /\.css(?:\?|$)/.test(resource.name)),
        resources: beforeInteraction.resources, longTasks: beforeInteraction.longTasks,
        syntheticMenuInteraction: { eventTimingEntries: observedEvents, longestObservedEventMs: observedEvents.length ? Math.max(...observedEvents.map(entry => entry.duration)) : null, note: 'Event Timing omits events under its 16 ms reporting threshold. This synthetic sample is not field INP.' },
        goals: { lcpMs: 2500, inpMs: 200, cls: 0.1, note: 'Goals only; performance observations do not gate the functional checks. Real-user measurement is still required.' },
      };
      expect(beforeInteraction.lcp, 'LCP entry should be observable in Chromium').not.toBeNull();
      return { lcpMs: beforeInteraction.lcp?.milliseconds, cls: beforeInteraction.cls, transferredBytes: initialTransferredBytes, requests: initialRequests, javascriptResources: report.performance.javascript.length, cssResources: report.performance.stylesheets.length, syntheticMenuLongestEventMs: report.performance.syntheticMenuInteraction.longestObservedEventMs };
    } finally { await perfContext.close(); }
  });

  await check('No browser console errors, page errors, failed requests or failed responses', () => {
    for (const [name, events] of Object.entries(report.runtime)) expect(events, name).toEqual([]);
  });
} catch (error) {
  report.checks.push({ name: 'Verification infrastructure', passed: false, error: error.stack || String(error) });
} finally {
  if (browser) await browser.close();
  report.summary = { passed: report.checks.filter(item => item.passed).length, failed: report.checks.filter(item => !item.passed).length };
  await writeFile(resolve(output, 'checks.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(`Verification: ${report.summary.passed} passed, ${report.summary.failed} failed. Report: ${resolve(output, 'checks.json')}`);
  if (report.summary.failed) process.exitCode = 1;
}
