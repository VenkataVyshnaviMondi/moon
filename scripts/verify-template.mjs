import { chromium, expect } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';

const base = process.env.VERIFY_URL || 'http://127.0.0.1:5173/';
const output = '.impeccable/review/original-template';
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, timeout: 15000 });
const report = { template: 'original white-and-blue', checks: [], errors: [] };
try {
  const page = await browser.newPage({ viewport: { width: 1242, height: 585 }, deviceScaleFactor: 1.5 });
  page.on('pageerror', error => report.errors.push(error.message));
  await page.goto(`${base}#/about`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.locator('.about-ceo-pause').evaluate(button => { if (button.getAttribute('aria-pressed') !== 'true') button.click(); });
  await page.waitForFunction(() => !document.querySelector('.about-editorial-title')?.classList.contains('particle-ready'), null, { timeout: 15000 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(page.locator('.about-editorial-title')).toBeVisible();
  await expect(page.locator('header .brand img')).toHaveAttribute('src', 'logo.png');
  await expect(page.locator('nav a[aria-current="page"]')).toHaveText('About');
  await expect(page.locator('#hero-heading')).toHaveCount(0);
  await expect(page.locator('.about-ceo-row.is-active').getByRole('heading')).toContainText('Malla Krishnachaitanya');
  await page.screenshot({ path: `${output}/about-desktop.png` });
  report.checks.push('Desktop matches the original About template and selected navigation.');

  for (const [route, selector] of [['/', '.brand-story'], ['/about', '.about-editorial'], ['/services', '.notched-services-section'], ['/clients', '.clients'], ['/careers', '.career-openings'], ['/contact', '#enquiry']]) {
    await page.goto(`${base}#${route}`, { waitUntil: 'domcontentloaded' });
    await expect(page.locator(selector).first()).toBeVisible();
    report.checks.push(`Route #${route} renders.`);
  }
  await page.goto(`${base}#/contact?service=Zoho%20Projects`);
  await expect(page.locator('#enquiry-service')).toHaveValue('Zoho Projects');
  report.checks.push('Service-specific contact link preselects Zoho Projects.');

  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(`${base}#/about`, { waitUntil: 'networkidle' });
  const menu = page.locator('.menu-toggle');
  await menu.click();
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await page.locator('nav a[href="#/services"]').click();
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('.notched-services-section')).toBeVisible();
  report.checks.push('Mobile navigation opens, follows a route and closes.');
  await page.goto(`${base}#/about`, { waitUntil: 'networkidle' });
  const fits = await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth);
  expect(fits).toBe(true);
  await page.screenshot({ path: `${output}/about-mobile.png` });
  report.checks.push('Mobile About page fits the viewport.');
  expect(report.errors).toEqual([]);
  report.checks.push('No unhandled browser errors.');
  console.log(JSON.stringify(report, null, 2));
} finally {
  await writeFile(`${output}/checks.json`, JSON.stringify(report, null, 2));
  await browser.close();
}
