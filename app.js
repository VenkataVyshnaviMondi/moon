"use strict";
function requiredElement(selector) {
    const element = document.querySelector(selector);
    if (!element)
        throw new Error(`Missing element: ${selector}`);
    return element;
}
const main = requiredElement('main');
const arrow = '<span aria-hidden="true">↗</span>';
const services = [
    ['Branding', 'Branding.png', 'A distinctive identity. A consistent voice. Build a brand people recognise and remember.'],
    ['Social Media Marketing', '04_Social_Media_Marketing.png', 'Thoughtful content and social strategies that turn attention into meaningful connections.'],
    ['Web Designing', 'web designing.png', 'Fast, intuitive digital experiences that bring your brand to life on every screen.'],
    ['IT Solutions', 'it solutions.png', 'Practical technology solutions designed around the way your business works.'],
    ['Google Ads', '03_Google_Ads_PPC.png', 'Reach people when they are searching for what you offer with focused paid campaigns.'],
    ['Meta Ads', 'meta ads.png', 'Connect with your audience across Facebook and Instagram through creative-led campaigns.'],
    ['Zoho Projects', 'Zoho.png', 'Organise tasks, milestones and team collaboration with Zoho Projects, configured around the way your business works.'],
    ['YouTube Marketing', '07_YouTube_Marketing.png', 'Tell your story through video and reach the right audience with purposeful promotion.']
];
const leaders = [{ name: 'Chippada Tej Kumar', image: 'Chippada Tej Kumar.png', heading: 'Good ideas deserve<br>a great team.', copy: 'We bring design, marketing and technology together to help businesses take their next step with clarity. Every project starts with listening, and every detail has a purpose.' }, { name: 'Malla Krishnachaitanya', image: 'Malla Krishnachaitanya.png', heading: 'A shared vision.<br>A lasting impact.', copy: 'Building your digital presence is a collaborative journey. We connect creative thinking with practical solutions, keeping your business goals at the heart of the work.' }];
function cards() { return services.map(([name, img, desc]) => `<a class="service-card" href="#/contact?service=${encodeURIComponent(name)}"><div class="service-image"><img src="services/${img}" alt="${name}" loading="lazy">${arrow}</div><h3>${name}</h3><p>${desc}</p></a>`).join(''); }
function notchedServiceCards() {
    return services.map(([name, image, description]) => `<a class="notched-service-card" href="#/contact?service=${encodeURIComponent(name)}"><div class="notched-service-media"><div class="notched-service-cover"><img src="services/${image}" alt="${name}" loading="lazy"></div><span class="service-notch" aria-hidden="true"></span><span class="service-fillet service-fillet-right" aria-hidden="true"></span><span class="service-fillet service-fillet-bottom" aria-hidden="true"></span><span class="notched-service-arrow" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6 18 18 6M6 6h12v12"/></svg></span></div><h3>${name}</h3><p>${description}</p></a>`).join('');
}
function clients(showDescriptions = false) { return `<section class="clients client-showcase" aria-labelledby="clients-heading"><h2 id="clients-heading">Our Clients</h2><div class="molten-clients" aria-roledescription="carousel" aria-label="Our clients"><canvas tabindex="0" role="img" aria-label="Client logo carousel. Use arrow keys to change client, or drag to turn the ring."></canvas><div class="client-panels"><div class="client-panel"><img src="swiggy.png" alt="Swiggy" loading="lazy"></div><div class="client-panel"><img src="ayantech.png" alt="Ayantech" loading="lazy"></div></div>${showDescriptions ? '<div class="client-company-description" aria-live="polite"><p data-client-description>Swiggy is India’s leading on-demand convenience and hyperlocal commerce platform for food delivery, Instamart and Dineout. Founded in 2014, it is headquartered in Bengaluru, Karnataka.</p></div>' : ''}<div class="molten-caption" aria-live="polite"><small data-client-count>1 / 2</small><h3 data-client-title>Swiggy</h3></div></div></section>`; }
function leader(darkHome = false) { return `<section class="leadership${darkHome ? ' leadership-dark' : ''}" aria-label="Meet our CEOs"><div class="leader-slide"><div class="leader-portrait"><img id="leader-image" src="${leaders[0].image}" alt="${leaders[0].name}" loading="lazy"></div><div class="leader-copy"><h2 id="leader-heading">${leaders[0].heading}</h2><p id="leader-copy">${leaders[0].copy}</p><div class="leader-name"><strong id="leader-name">${leaders[0].name}</strong><small>CEO, Moon Crafters</small></div><div class="slider-controls"><button class="active" data-slide="0" aria-label="Show Chippada Tej Kumar" aria-pressed="true"></button><button data-slide="1" aria-label="Show Malla Krishnachaitanya" aria-pressed="false"></button><button class="pause" aria-label="Pause CEO slideshow">Pause slideshow</button></div></div></div></section>`; }
function process(animated = false) { const steps = [['Discovery & Alignment', 'We get to know your business, audience and goals, then agree on a clear direction.'], ['Design & Iteration', 'We develop ideas and refine them together through focused feedback and review.'], ['Execution', 'We bring the approved direction to life across your brand, website or campaigns.'], ['Delivery & Ongoing Support', 'We hand over the work with guidance and support for what comes next.']]; return `<section class="section process${animated ? ' process-pinned' : ''}"><div class="process-intro"><h2>Great work starts<br>with a clear process.</h2><p>A collaborative approach that keeps every step purposeful, from the first conversation to the final detail.</p><a class="text-link" href="#/contact">Schedule a conversation ${arrow}</a></div><div class="process-list">${animated ? '<svg class="process-trail" viewBox="0 0 700 900" preserveAspectRatio="none" aria-hidden="true"><path d="M175 140 C420 110 490 240 525 310 S310 460 175 520 S320 740 525 740" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="8 6" vector-effect="non-scaling-stroke"/></svg>' : ''}${steps.map(([n, d], i) => `<article>${animated ? '<svg class="process-pin" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M8 3h8v2h-1v5l3 4v3h-5v5h-2v-5H6v-3l3-4V5H8z"/></svg>' : ''}<span class="step">0${i + 1}</span><div><h3>${n}</h3><p>${d}</p></div></article>`).join('')}</div></section>`; }
function intro(title, copy) { return `<section class="page-intro"><h1>${title}</h1><p>${copy}</p></section>`; }
const clientFeedback = [
    { title: 'A clearer way to manage projects', scenario: 'Zoho Projects setup for a startup team', quote: 'We wanted one place to plan work, assign tasks and follow deadlines. A thoughtful Zoho Projects setup would help our small team stay organised as the business grows.', image: 'services/it solutions.png' },
    { title: 'Technology that supports the team', scenario: 'IT solutions for an early-stage business', quote: 'As a startup, we need practical IT guidance and a website that is easy to use. Having a team that explains the options clearly would make the next step feel manageable.', image: 'services/web designing.png' },
    { title: 'A consistent digital presence', scenario: 'Digital marketing for a growing brand', quote: 'Our priority is to introduce the brand with a clear message and consistent content. Bringing our website, social media and campaigns together would give us a focused place to start.', image: 'services/04_Social_Media_Marketing.png' }
];
function testimonialsSection() {
    return `<section class="section testimonials-section" aria-labelledby="testimonials-heading"><div class="section-head"><h2 id="testimonials-heading">Startup scenarios</h2></div><div class="feedback-carousel" aria-roledescription="carousel" aria-label="Startup scenarios"><div class="feedback-visual"><img id="feedback-image" src="${clientFeedback[0].image}" alt="IT solutions" loading="lazy"></div><div class="feedback-card"><div id="feedback-content" aria-live="polite"><h3 id="feedback-title">${clientFeedback[0].title}</h3><p id="feedback-scenario">${clientFeedback[0].scenario}</p><blockquote id="feedback-quote">${clientFeedback[0].quote}</blockquote></div><a class="text-link" href="#/contact">Let’s discuss your goals ${arrow}</a></div></div><div class="feedback-controls"><button type="button" data-feedback-prev aria-label="Previous scenario"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14 6-6 6 6 6"/></svg></button><div class="feedback-dots">${clientFeedback.map((_, i) => `<button type="button" data-feedback-slide="${i}" aria-label="Show startup scenario ${i + 1}" aria-pressed="${i === 0}"></button>`).join('')}</div><button type="button" data-feedback-next aria-label="Next scenario"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m10 6 6 6-6 6"/></svg></button></div></section>`;
}
let cleanupHomeVideoScroll;
let cleanupCeoOverlap;
let cleanupFeedback;
function setupTestimonials() {
    const carousel = document.querySelector('.feedback-carousel');
    if (!carousel)
        return;
    let current = 0;
    let lastChange = Date.now();
    let visible = false;
    const section = carousel.closest('.testimonials-section');
    const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; lastChange = Date.now(); }, { threshold: .25 });
    observer.observe(carousel);
    const show = (index) => {
        lastChange = Date.now();
        current = (index + clientFeedback.length) % clientFeedback.length;
        const item = clientFeedback[current];
        const image = requiredElement('#feedback-image');
        image.src = item.image;
        image.alt = item.scenario;
        requiredElement('#feedback-title').textContent = item.title;
        requiredElement('#feedback-scenario').textContent = item.scenario;
        requiredElement('#feedback-quote').textContent = item.quote;
        document.querySelectorAll('[data-feedback-slide]').forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.feedbackSlide) === current)));
        if (!reducedMotion.matches) {
            requiredElement('#feedback-content').animate([{ opacity: .25, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 300, easing: 'ease-out' });
            image.animate([{ opacity: .3 }, { opacity: 1 }], { duration: 350 });
        }
    };
    requiredElement('[data-feedback-prev]').onclick = () => show(current - 1);
    requiredElement('[data-feedback-next]').onclick = () => show(current + 1);
    document.querySelectorAll('[data-feedback-slide]').forEach(button => { button.onclick = () => show(Number(button.dataset.feedbackSlide)); });
    carousel.addEventListener('keydown', event => { if (event.key === 'ArrowRight')
        show(current + 1); if (event.key === 'ArrowLeft')
        show(current - 1); });
    const autoplay = window.setInterval(() => {
        if (!visible || document.hidden || reducedMotion.matches || Date.now() - lastChange < 2000)
            return;
        show(current + 1);
    }, 100);
    cleanupFeedback = () => { clearInterval(autoplay); observer.disconnect(); };
}
function projectCallToAction() {
    return `<section class="project-cta-section" aria-labelledby="project-cta-heading"><div class="project-cta-panel"><h2 id="project-cta-heading">Ready to move your business forward?</h2><p>Bring your next idea to life with connected technology,<br>creative thinking and digital marketing.</p><a class="project-cta-button" href="#/contact">Start a project ${arrow}</a></div></section>`;
}
function setupServiceDiscovery() {
    const root = document.querySelector('.service-discovery');
    if (!root)
        return;
    let selected = 0;
    const links = Array.from(root.querySelectorAll('[data-discovery]'));
    const show = (index) => {
        if (index === selected)
            return;
        selected = index;
        const [name, file, description] = services[index];
        const image = requiredElement('#discovery-image');
        image.src = `services/${file}`;
        image.alt = name;
        requiredElement('#discovery-name').textContent = name;
        requiredElement('#discovery-description').textContent = description;
        links.forEach(link => link.classList.toggle('is-selected', Number(link.dataset.discovery) === index));
        if (!reducedMotion.matches) {
            image.animate([{ opacity: .2, transform: 'scale(.97) translateY(10px)' }, { opacity: 1, transform: 'scale(1) translateY(0)' }], { duration: 360, easing: 'cubic-bezier(.16,1,.3,1)' });
        }
    };
    links.forEach((link, index) => {
        let touchWasSelected = false;
        link.addEventListener('pointerenter', event => { if (event.pointerType !== 'touch')
            show(index); });
        link.addEventListener('focus', () => show(index));
        link.addEventListener('pointerdown', event => { if (event.pointerType === 'touch') {
            touchWasSelected = selected === index;
            link.dataset.touch = 'true';
            show(index);
        } });
        link.addEventListener('click', event => { if (link.dataset.touch === 'true') {
            delete link.dataset.touch;
            if (!touchWasSelected)
                event.preventDefault();
        } });
    });
}
function homeHero() {
    const labels = ['Welcome', 'Our Clients', 'Our services'];
    return `<section class="brand-story" aria-label="Moon Crafters introduction"><div class="brand-stage"><div class="brand-orbit" aria-hidden="true"></div><img class="brand-story-logo" src="logo1.png" alt="" aria-hidden="true"><article class="brand-scene brand-welcome" data-scene="0"><div class="brand-cover"><h1>Moon Crafters</h1><div class="brand-cover-bottom"><h2>Build brands.<br><span>Create impact.</span></h2><div><p>Your next chapter starts with design, digital marketing and technology working together.</p><a class="button" href="#/services">Explore what we do ${arrow}</a></div></div></div></article><article class="brand-scene brand-clients" data-scene="1" id="home-clients">${clients()}</article><article class="brand-scene brand-services brand-services-discovery" data-scene="2"><h2 class="service-discovery-heading">Our <span>Services</span></h2><div class="service-discovery"><figure class="service-discovery-preview"><div class="service-discovery-picture"><img id="discovery-image" src="services/${services[0][1]}" alt="${services[0][0]}" loading="lazy"></div><figcaption><strong id="discovery-name">${services[0][0]}</strong><p id="discovery-description">${services[0][2]}</p></figcaption></figure><div class="service-discovery-index" aria-label="Explore services">${services.map(([name], index) => `<a class="service-index-link${index === 0 ? ' is-selected' : ''}" data-discovery="${index}" href="#/contact?service=${encodeURIComponent(name)}">${name}</a>`).join('')}</div></div></article><div class="brand-scene-nav" role="group" aria-label="Hero chapters">${labels.map((label, index) => `<button type="button" data-chapter="${index}" aria-label="${label}" ${index === 0 ? 'aria-current="step"' : ''}><span>${label}</span><i aria-hidden="true"></i></button>`).join('')}</div><div class="brand-stage-footer" aria-hidden="true"></div><div class="brand-story-progress" aria-hidden="true"><i></i></div></div></section>`;
}
const pages = {
    home: () => `${homeHero()}${leader(true)}<div class="home-after-ceo"><section class="home-video-scroll" aria-label="Moon Crafters services video"><div class="home-video-sticky"><div class="home-video-media"><video autoplay loop muted playsinline preload="metadata" aria-label="Moon Crafters services"><source src="video.mp4" type="video/mp4"></video><div class="home-video-overlay"><h2>Our Services</h2><p>Creative thinking. Connected technology.</p></div></div></div></section><section class="section services-home"><div class="section-head"><h2>Different expertise.<br>One shared ambition.</h2><a class="text-link" href="#/services">All our services ${arrow}</a></div><div class="service-grid">${cards()}</div></section>${testimonialsSection()}${process(true)}</div>`,
    about: () => `<section class="about-editorial" aria-labelledby="about-hero-title"><h1 id="about-hero-title" class="about-editorial-title"><span>Moon</span><img src="logo1.png" alt=""><span>Crafters</span></h1><div class="about-ceo-rows"><article class="about-ceo-row" aria-labelledby="about-malla"><div class="about-ceo-text"><h2 id="about-malla">Meet<br><strong>Mr.&nbsp;Malla Krishnachaitanya</strong></h2><p class="about-ceo-role">CEO of Moon Crafters Solutions</p><p>Building your digital presence is a collaborative journey. We connect creative thinking with practical solutions, keeping your business goals at the heart of the work.</p><a class="about-ceo-link" href="#/contact">Start a conversation ${arrow}</a></div><figure class="about-ceo-photo"><img src="Malla Krishnachaitanya.png" alt="Malla Krishnachaitanya, CEO of Moon Crafters Solutions" fetchpriority="high"></figure></article><article class="about-ceo-row" aria-labelledby="about-tej"><div class="about-ceo-text"><h2 id="about-tej">Meet<br><strong>Mr.&nbsp;Chippada Tej Kumar</strong></h2><p class="about-ceo-role">CEO of Moon Crafters Solutions</p><p>We bring design, marketing and technology together to help businesses take their next step with clarity. Every project starts with listening, and every detail has a purpose.</p><a class="about-ceo-link" href="#/contact">Start a conversation ${arrow}</a></div><figure class="about-ceo-photo"><img src="Chippada Tej Kumar.png" alt="Chippada Tej Kumar, CEO of Moon Crafters Solutions" loading="lazy"></figure></article></div></section><section class="section about-company about-company-statement" aria-labelledby="about-company-title"><div class="about-statement-content"><h2 id="about-company-title">Your growth. Our purpose.</h2><p class="about-belief">At Moon Crafters, we bring technology and creative thinking together through IT services and digital marketing. We prioritize our customers&#8217; growth and satisfaction because quality matters more than quantity.</p><div class="about-statement-bottom"><p>MOON CRAFTERS SOLUTIONS PRIVATE LIMITED is a Private Limited Company incorporated on May 21, 2025 in India.</p><a class="text-link" href="#/services">Explore our services ${arrow}</a></div></div></section><section class="clients client-showcase about-static-clients" aria-labelledby="about-clients-heading"><h2 id="about-clients-heading">Our Clients</h2><div class="client-panels"><div class="client-panel"><img src="swiggy.png" alt="Swiggy" loading="lazy"></div><div class="client-panel"><img src="ayantech.png" alt="Ayantech" loading="lazy"></div></div></section>`,
    services: () => `<section class="page-intro services-page-heading"><h1 class="services-text-shimmer">Our Services</h1></section><section class="section notched-services-section"><div class="service-grid">${notchedServiceCards()}</div></section>`,
    clients: () => `<section class="clients-page-hero" aria-labelledby="clients-page-title"><div class="clients-page-hero-copy"><h1 id="clients-page-title">Better,<br><span>together.</span></h1><p>The brands we work with are part of our story. Here&#8217;s to ideas, collaboration and what comes next.</p></div></section>${clients(true)}${process(true)}`,
    careers: () => `<section class="careers-page-hero" aria-labelledby="careers-page-title"><div class="careers-page-hero-copy"><h1 id="careers-page-title">Make your next move<br><span>mean something.</span></h1><p>Curious thinkers. Thoughtful makers. People who care about the work. There&#8217;s room for your perspective at Moon Crafters.</p></div></section>${careerOpenings()}`,
    contact: () => `<section class="contact-page-hero" aria-labelledby="contact-page-title"><div class="contact-page-hero-copy"><h1 id="contact-page-title">Big idea?<br><span>Let&#8217;s talk.</span></h1><p>Tell us what you have in mind. We&#8217;ll start with a conversation and find the right way forward.</p></div></section><section class="section contact-layout"><div class="contact-info"><h2>A conversation<br>changes things.</h2><div class="contact-item"><img class="contact-detail-icon" src="call.png" alt="" aria-hidden="true"><small>Call us</small><a href="tel:+917032004558">+91 70320 04558</a></div><div class="contact-item"><img class="contact-detail-icon" src="mail.png" alt="" aria-hidden="true"><small>Write to us</small><a href="mailto:mooncrafters@gamil.com">mooncrafters@gamil.com</a></div><div class="contact-item"><img class="contact-detail-icon" src="location.png" alt="" aria-hidden="true"><small>Find us</small><p>13-35-1, Chakali Veedhi, Kothavalasa, Vizianagaram, Kothavalasa, Andhra Pradesh, India, 535183</p></div><iframe title="Google Map of Moon Crafters in Kothavalasa" src="https://maps.google.com/maps?q=Chakali%20Veedhi%2C%20Kothavalasa%2C%20Vizianagaram%2C%20Kothavalasa%2C%20Andhra%20Pradesh%2C%20India%2C%20535183&z=16&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe></div><form id="enquiry" class="contact-rounded-form" aria-labelledby="contact-form-heading"><div class="contact-form-heading"><p class="contact-form-tag">Contact Us</p><h2 id="contact-form-heading">Let&#8217;s Get In Touch.</h2></div>
<label for="enquiry-name">Full Name <span aria-hidden="true">*</span></label><div class="contact-input-shell"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/></svg><input id="enquiry-name" name="name" autocomplete="name" placeholder="Enter your full name" required maxlength="100"></div>
<label for="enquiry-phone">Phone Number <span aria-hidden="true">*</span></label><div class="contact-input-shell"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3H3c-1 10 8 19 18 18v-4l-5-2-2 2a16 16 0 0 1-7-7l2-2-3-5Z"/></svg><input id="enquiry-phone" name="phone" type="tel" inputmode="numeric" autocomplete="tel-national" placeholder="Enter your phone number" pattern="[0-9]{10}" maxlength="10" title="Enter a 10-digit phone number" required></div>
<label for="enquiry-email">Email Address <span aria-hidden="true">*</span></label><div class="contact-input-shell"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/></svg><input id="enquiry-email" name="email" type="email" aria-describedby="enquiry-email-error" autocomplete="email" placeholder="Enter your email address" required maxlength="254"></div>
<p id="enquiry-email-error" class="contact-email-error" role="alert"></p><label for="enquiry-service">Service <span aria-hidden="true">*</span></label><select id="enquiry-service" name="service" required><option value="">Select a service</option>${services.map(([name]) => `<option value="${name}">${name}</option>`).join('')}</select>
<label for="enquiry-goals">Tell us your goal <span aria-hidden="true">*</span></label><textarea id="enquiry-goals" name="goals" rows="4" placeholder="Tell us what you would like to achieve" required maxlength="5000"></textarea>
<div class="form-foot"><button class="button" type="submit">Submit Form <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6"/></svg></button></div></form></section>`
};
let cleanupAboutCeo;
function setupAboutCeo() {
    const root = document.querySelector('.about-ceo-rows');
    if (!root)
        return;
    const rows = Array.from(root.querySelectorAll('.about-ceo-row'));
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let current = 0, visible = false, changing = false, disposed = false, last = Date.now();
    const animations = [];
    rows.forEach((row, index) => {
        const photo = row.querySelector('.about-ceo-photo');
        if (!photo)
            return;
        const image = photo.querySelector('img');
        if (image) {
            const surface = document.createElement('div');
            surface.className = 'about-ceo-image-wrap';
            photo.insertBefore(surface, image);
            surface.append(image);
        }
        const ring = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        ring.classList.add('about-ceo-ring');
        ring.setAttribute('viewBox', '0 0 200 200');
        ring.setAttribute('aria-hidden', 'true');
        ring.innerHTML = `<defs><path id="ceo-ring-${index}" d="M100,100 m-77,0 a77,77 0 1,1 154,0 a77,77 0 1,1 -154,0"/></defs><text><textPath href="#ceo-ring-${index}" textLength="480" lengthAdjust="spacing">MEET OUR CEOS &#183; MOON CRAFTERS &#183; </textPath></text>`;
        photo.append(ring);
    });
    const controls = document.createElement('div');
    controls.className = 'about-ceo-controls';
    controls.innerHTML = rows.map((_, index) => `<button type="button" aria-label="Show ${index === 0 ? 'Malla Krishnachaitanya' : 'Chippada Tej Kumar'}" data-about-ceo="${index}" aria-pressed="${index === 0}"></button>`).join('') + '<button type="button" class="about-ceo-pause" aria-pressed="false">Pause slideshow</button>';
    root.append(controls);
    let paused = false;
    const pause = controls.querySelector('.about-ceo-pause');
    pause.onclick = () => { paused = !paused; pause.textContent = paused ? 'Play slideshow' : 'Pause slideshow'; pause.setAttribute('aria-pressed', String(paused)); last = Date.now(); };
    const sync = () => {
        root.classList.toggle('ceo-carousel', !motion.matches);
        rows.forEach((row, index) => { row.classList.toggle('is-active', index === current); row.classList.remove('is-outgoing'); row.inert = !motion.matches && index !== current; if (!motion.matches)
            row.setAttribute('aria-hidden', String(index !== current));
        else
            row.removeAttribute('aria-hidden'); });
    };
    const show = async (index) => {
        if (changing || index === current || motion.matches)
            return;
        changing = true;
        last = Date.now();
        const outgoing = rows[current], incoming = rows[index];
        current = index;
        outgoing.classList.remove('is-active');
        outgoing.classList.add('is-outgoing');
        outgoing.inert = true;
        outgoing.setAttribute('aria-hidden', 'true');
        incoming.classList.add('is-active');
        incoming.inert = false;
        incoming.setAttribute('aria-hidden', 'false');
        controls.querySelectorAll('[data-about-ceo]').forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.aboutCeo) === index)));
        const photo = incoming.querySelector('.about-ceo-image-wrap');
        const reveal = photo.animate([{ clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0 0)' }], { duration: 1400, easing: 'cubic-bezier(.76,0,.24,1)' });
        const portrait = incoming.querySelector('.about-ceo-photo img');
        animations.push(portrait.animate([{ transform: 'translateY(-100%) scale(1.04)' }, { transform: 'translateY(0) scale(1)' }], { duration: 1400, easing: 'cubic-bezier(.76,0,.24,1)' }));
        const text = incoming.querySelector('.about-ceo-text');
        animations.push(reveal, text.animate([{ opacity: 0, transform: 'translateY(-24px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 600, easing: 'ease-out' }));
        await reveal.finished.catch(() => { });
        if (!disposed) {
            outgoing.classList.remove('is-outgoing');
            changing = false;
        }
    };
    controls.querySelectorAll('[data-about-ceo]').forEach(button => { button.onclick = () => { void show(Number(button.dataset.aboutCeo)); }; });
    const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; last = Date.now(); }, { threshold: .2 });
    observer.observe(root);
    const timer = window.setInterval(() => { if (visible && !paused && !document.hidden && !motion.matches && Date.now() - last >= 2000)
        void show((current + 1) % rows.length); }, 500);
    const change = () => { animations.forEach(animation => animation.cancel()); changing = false; sync(); };
    motion.addEventListener('change', change);
    sync();
    cleanupAboutCeo = () => { disposed = true; clearInterval(timer); observer.disconnect(); animations.forEach(animation => animation.cancel()); motion.removeEventListener('change', change); };
}
let cleanupPurposeReveal;
function setupPurposeReveal() {
    const paragraph = document.querySelector('.about-belief');
    if (!paragraph)
        return;
    const text = paragraph.textContent || '';
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    paragraph.textContent = '';
    const accessible = document.createElement('span');
    accessible.className = 'purpose-sr-text';
    accessible.textContent = text;
    paragraph.append(accessible);
    const characters = [];
    text.split(/(\s+)/).forEach(part => {
        if (/^\s+$/.test(part)) {
            paragraph.append(document.createTextNode(part));
            return;
        }
        const word = document.createElement('span');
        word.className = 'purpose-reveal-word';
        word.setAttribute('aria-hidden', 'true');
        for (const letter of part) {
            const character = document.createElement('span');
            character.textContent = letter;
            word.append(character);
            characters.push(character);
        }
        paragraph.append(word);
    });
    let frame = 0;
    const update = () => {
        frame = 0;
        const rect = paragraph.getBoundingClientRect();
        const progress = motion.matches ? 1 : Math.max(0, Math.min(1, (window.innerHeight * .85 - rect.top) / (rect.height + window.innerHeight * .3)));
        characters.forEach((character, index) => {
            const amount = motion.matches ? 1 : Math.max(0, Math.min(1, (progress * (characters.length + 6) - index) / 6));
            character.style.opacity = String(.34 + .66 * amount);
        });
    };
    const schedule = () => { if (!frame)
        frame = requestAnimationFrame(update); };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    motion.addEventListener('change', schedule);
    const resize = new ResizeObserver(schedule);
    resize.observe(paragraph);
    update();
    cleanupPurposeReveal = () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); motion.removeEventListener('change', schedule); resize.disconnect(); };
}
let cleanupSignalHeading;
function setupSignalHeading() {
    const heading = document.querySelector('.services-page-heading h1');
    if (!heading)
        return;
    const text = heading.textContent?.trim() || 'Our Services';
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    heading.setAttribute('aria-label', text);
    heading.classList.add('signal-heading');
    heading.textContent = '';
    const letters = [];
    text.split(' ').forEach((word, index) => {
        if (index)
            heading.append(document.createTextNode(' '));
        const wrapper = document.createElement('span');
        wrapper.className = 'signal-word';
        wrapper.setAttribute('aria-hidden', 'true');
        for (const character of word) {
            const span = document.createElement('span');
            span.className = 'signal-letter';
            span.textContent = character;
            wrapper.append(span);
            letters.push(span);
        }
        heading.append(wrapper);
    });
    let animations = [];
    let lastPlay = -Infinity;
    let hasPlayed = false;
    const play = () => {
        if (motion.matches || performance.now() - lastPlay < 1800)
            return;
        lastPlay = performance.now();
        hasPlayed = true;
        animations.forEach(animation => animation.cancel());
        const color = getComputedStyle(heading).color;
        const order = letters.map((_, index) => index).sort(() => Math.random() - .5);
        animations = letters.map((letter, index) => letter.animate([
            { color: 'transparent', webkitTextStrokeColor: 'rgba(0,111,131,.42)', opacity: 1, offset: 0 },
            { color, webkitTextStrokeColor: 'transparent', opacity: 1, offset: .18 },
            { color: 'transparent', webkitTextStrokeColor: 'rgba(0,111,131,.42)', opacity: .7, offset: .26 },
            { color, webkitTextStrokeColor: 'transparent', opacity: 1, offset: .5 },
            { color: 'rgba(0,111,131,.36)', webkitTextStrokeColor: 'transparent', opacity: .8, offset: .62 },
            { color, webkitTextStrokeColor: 'transparent', opacity: 1, offset: 1 }
        ], { duration: 850, delay: 150 + order.indexOf(index) * 45, easing: 'steps(1,end)', fill: 'backwards' }));
    };
    const observer = new IntersectionObserver(entries => { if (entries[0].isIntersecting && !hasPlayed)
        play(); }, { threshold: .5 });
    observer.observe(heading);
    const change = () => { if (motion.matches)
        animations.forEach(animation => animation.cancel()); };
    motion.addEventListener('change', change);
    cleanupSignalHeading = () => { observer.disconnect(); animations.forEach(animation => animation.cancel()); motion.removeEventListener('change', change); };
}
let cleanupAboutParticles;
let cleanupServices;
let cleanupClients;
let cleanupLogoMotion;
function setupHomeLogoMotion() {
    const story = document.querySelector('.brand-story');
    const stage = document.querySelector('.brand-stage');
    const logo = document.querySelector('.brand-story-logo');
    if (!story || !stage || !logo)
        return;
    logo.addEventListener('error', () => { logo.src = 'logo.png'; }, { once: true });
    const scenes = Array.from(document.querySelectorAll('[data-scene]'));
    const buttons = Array.from(document.querySelectorAll('[data-chapter]'));
    const desktop = [[50, 23, 1, -12, -6], [81, 16, .85, 18, 5], [91, 8, .3, 0, 0]];
    const mobile = [[50, 20, .8, -12, -6], [80, 12, .72, 18, 5], [87, 7, .3, 0, 0]];
    let frame = 0;
    let active = -1;
    const clamp = (value) => Math.max(0, Math.min(1, value));
    const measure = () => ({ start: story.getBoundingClientRect().top + window.scrollY - parseFloat(getComputedStyle(stage).top), distance: Math.max(1, story.offsetHeight - stage.offsetHeight) });
    const update = () => {
        frame = 0;
        const staticMode = reducedMotion.matches;
        story.classList.toggle('is-static', staticMode);
        if (staticMode) {
            scenes.forEach(scene => { scene.style.removeProperty('opacity'); scene.style.removeProperty('visibility'); scene.style.removeProperty('transform'); scene.inert = false; scene.removeAttribute('aria-hidden'); });
            logo.removeAttribute('style');
            active = -1;
            return;
        }
        const { start, distance } = measure();
        const progress = clamp((window.scrollY - start) / distance);
        const position = progress * (scenes.length - 1);
        const index = Math.min(Math.floor(position), scenes.length - 2);
        const local = clamp((position - index - .12) / .76);
        const ease = local < .5 ? 4 * local ** 3 : 1 - (-2 * local + 2) ** 3 / 2;
        const poses = (window.innerWidth < 760 ? mobile : desktop).map(pose => [...pose]);
        const title = story.querySelector('h1');
        if (title) {
            const available = Math.max(70, title.getBoundingClientRect().top - stage.getBoundingClientRect().top - 18);
            // The PNG has generous transparent margins: size its visible mark, not its full canvas.
            poses[0][2] = Math.min(1.65, available / Math.max(1, logo.offsetHeight * .68));
            poses[0][1] = (8 + available / 2) / stage.offsetHeight * 100;
        }
        const pose = poses[index].map((value, axis) => value + (poses[index + 1][axis] - value) * ease);
        logo.style.left = `${pose[0]}%`;
        logo.style.top = `${pose[1]}%`;
        logo.style.transform = `translate(-50%, -50%) perspective(1200px) rotateY(${pose[3]}deg) rotateZ(${pose[4]}deg) scale(${pose[2]})`;
        const next = Math.round(index + ease);
        scenes.forEach((scene, sceneIndex) => {
            const opacity = clamp((.72 - Math.abs(index + ease - sceneIndex)) / .45);
            scene.style.opacity = String(opacity);
            scene.style.visibility = opacity < .01 ? 'hidden' : 'visible';
            scene.style.transform = `translateY(${(1 - opacity) * (sceneIndex > index + ease ? 24 : -24)}px)`;
            scene.inert = sceneIndex !== next;
            scene.setAttribute('aria-hidden', String(sceneIndex !== next));
        });
        if (next !== active) {
            active = next;
            buttons.forEach((button, buttonIndex) => { button.removeAttribute('aria-current'); if (buttonIndex === active)
                button.setAttribute('aria-current', 'step'); });
        }
        story.style.setProperty('--story-progress', String(progress));
    };
    const schedule = () => { if (!frame)
        frame = requestAnimationFrame(update); };
    buttons.forEach((button, index) => {
        button.onclick = () => {
            const { start, distance } = measure();
            window.scrollTo({ top: start + index / (scenes.length - 1) * distance, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
        };
    });
    const jump = story.querySelector('a[href="#home-clients"]');
    const jumpToClients = (event) => { event.preventDefault(); buttons[1]?.click(); };
    jump?.addEventListener('click', jumpToClients);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    reducedMotion.addEventListener('change', schedule);
    update();
    cleanupLogoMotion = () => {
        cancelAnimationFrame(frame);
        jump?.removeEventListener('click', jumpToClients);
        window.removeEventListener('scroll', schedule);
        window.removeEventListener('resize', schedule);
        reducedMotion.removeEventListener('change', schedule);
    };
}
let timer;
let slide = 0;
let paused = false;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
function setSlide(index) {
    slide = index;
    const leader = leaders[index];
    const image = requiredElement('#leader-image');
    image.src = leader.image;
    image.alt = leader.name;
    requiredElement('#leader-heading').innerHTML = leader.heading;
    requiredElement('#leader-copy').textContent = leader.copy;
    requiredElement('#leader-name').textContent = leader.name;
    document.querySelectorAll('[data-slide]').forEach(button => {
        const active = Number(button.dataset.slide) === index;
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', String(active));
    });
}
function setupVideo() {
    const video = document.querySelector('.hero video');
    if (!video)
        return;
    const ready = () => {
        video.classList.add('ready');
        requiredElement('.hero-art').hidden = true;
        if (reducedMotion.matches)
            video.pause();
    };
    video.muted = true;
    video.addEventListener('loadeddata', ready);
    video.addEventListener('error', () => {
        video.classList.remove('ready');
        requiredElement('.hero-art').hidden = false;
    });
    if (video.readyState >= 2)
        ready();
    if (reducedMotion.matches)
        video.pause();
}
function setupForm(query) {
    const form = document.querySelector('#enquiry');
    if (!form)
        return;
    const name = requiredElement('[name="name"]');
    const phone = requiredElement('[name="phone"]');
    const email = requiredElement('[name="email"]');
    const goals = requiredElement('[name="goals"]');
    const emailError = requiredElement('#enquiry-email-error');
    const validateEmail = () => {
        email.value = email.value.trim();
        const valid = /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/.test(email.value) && !email.validity.typeMismatch;
        const message = valid ? '' : 'Enter a valid email address, such as name@example.com.';
        email.setCustomValidity(message);
        email.setAttribute('aria-invalid', String(!valid));
        emailError.textContent = message;
        return valid;
    };
    email.addEventListener('blur', validateEmail);
    email.addEventListener('input', () => {
        email.setCustomValidity('');
        email.removeAttribute('aria-invalid');
        emailError.textContent = '';
    });
    email.addEventListener('invalid', () => { validateEmail(); });
    const serviceField = requiredElement('#enquiry-service');
    const requestedService = new URLSearchParams(query).get('service');
    if (requestedService) {
        const matchingService = services.find(([name]) => name.toLowerCase() === requestedService.toLowerCase());
        if (matchingService)
            serviceField.value = matchingService[0];
    }
    phone.addEventListener('input', () => { phone.value = phone.value.replace(/\D/g, '').slice(0, 10); });
    form.onsubmit = event => {
        event.preventDefault();
        name.value = name.value.trim();
        goals.value = goals.value.trim();
        const emailIsValid = validateEmail();
        if (!form.reportValidity() || !emailIsValid)
            return;
        const subject = `Website enquiry from ${name.value}`;
        const body = `Full name: ${name.value}\nPhone: ${phone.value}\nEmail: ${email.value}\nService: ${serviceField.value}\n\nTell us about your goals:\n${goals.value}`;
        const params = new URLSearchParams({ view: 'cm', fs: '1', to: 'mooncrafters@gamil.com', su: subject, body });
        window.open(`https://mail.google.com/mail/?${params}`, '_blank', 'noopener,noreferrer');
    };
}
function route() {
    const raw = location.hash.slice(1);
    if (raw && !raw.startsWith('/') && main.innerHTML)
        return;
    const [path, query] = raw.split('?');
    const candidate = (path || '/').replace('/', '') || 'home';
    const page = Object.prototype.hasOwnProperty.call(pages, candidate) ? candidate : 'home';
    cleanupAboutCeo?.();
    cleanupAboutCeo = undefined;
    cleanupPurposeReveal?.();
    cleanupPurposeReveal = undefined;
    cleanupSignalHeading?.();
    cleanupSignalHeading = undefined;
    cleanupAboutParticles?.();
    cleanupAboutParticles = undefined;
    cleanupHomeVideoScroll?.();
    cleanupHomeVideoScroll = undefined;
    cleanupCeoOverlap?.();
    cleanupCeoOverlap = undefined;
    cleanupFeedback?.();
    cleanupFeedback = undefined;
    cleanupServices?.();
    cleanupServices = undefined;
    cleanupClients?.();
    cleanupClients = undefined;
    cleanupLogoMotion?.();
    cleanupLogoMotion = undefined;
    clearInterval(timer);
    main.innerHTML = pages[page]() + projectCallToAction();
    document.title = `${page === 'home' ? 'Ideas into impact' : page[0].toUpperCase() + page.slice(1)} - Moon Crafters`;
    document.querySelectorAll('nav a').forEach(link => {
        link.removeAttribute('aria-current');
        if (link.hash === `#/${page}`)
            link.setAttribute('aria-current', 'page');
    });
    requiredElement('nav').classList.remove('open');
    requiredElement('.menu-toggle').setAttribute('aria-expanded', 'false');
    window.scrollTo(0, 0);
    if (document.querySelector('.leader-slide')) {
        slide = 0;
        paused = reducedMotion.matches;
        const pause = requiredElement('.pause');
        const sync = () => { pause.textContent = paused ? 'Play slideshow' : 'Pause slideshow'; pause.setAttribute('aria-label', pause.textContent); };
        sync();
        pause.onclick = () => { paused = !paused; sync(); };
        document.querySelectorAll('[data-slide]').forEach(button => { button.onclick = () => setSlide(Number(button.dataset.slide)); });
        timer = setInterval(() => { if (!paused && !document.hidden)
            setSlide((slide + 1) % leaders.length); }, 6000);
    }
    setupVideo();
    setupForm(query);
    setupTestimonials();
    setupCareerApplications();
    setupServiceDiscovery();
    setupHomeVideoScroll();
    setupCeoOverlap();
    setupPurposeReveal();
    setupAboutCeo();
    const aboutTitle = document.querySelector('.about-editorial-title');
    if (aboutTitle)
        cleanupAboutParticles = AboutParticles.mount(aboutTitle);
    if (page === 'home')
        setupHomeLogoMotion();
    const clientRoot = document.querySelector('.molten-clients');
    if (clientRoot)
        cleanupClients = ClientMolten.mount(clientRoot);
    document.querySelectorAll('.service-preview-link').forEach(link => {
        link.addEventListener('pointerdown', event => {
            if (event.pointerType === 'touch')
                link.dataset.touchPreview = 'true';
        });
        link.addEventListener('click', event => {
            if (link.dataset.touchPreview !== 'true')
                return;
            delete link.dataset.touchPreview;
            if (link.classList.contains('preview-open'))
                return;
            event.preventDefault();
            document.querySelectorAll('.preview-open').forEach(item => item.classList.remove('preview-open'));
            link.classList.add('preview-open');
        });
        link.addEventListener('blur', () => link.classList.remove('preview-open'));
        link.addEventListener('keydown', event => { if (event.key === 'Escape') {
            link.classList.remove('preview-open');
            link.blur();
        } });
    });
    const serviceRoot = document.querySelector('.service-wheel');
    if (serviceRoot)
        cleanupServices = ServiceWheel.mount(serviceRoot);
}
requiredElement('.menu-toggle').onclick = () => {
    const open = requiredElement('nav').classList.toggle('open');
    requiredElement('.menu-toggle').setAttribute('aria-expanded', String(open));
};
requiredElement('#year').textContent = String(new Date().getFullYear());
window.addEventListener('hashchange', route);
window.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
        requiredElement('nav').classList.remove('open');
        requiredElement('.menu-toggle').setAttribute('aria-expanded', 'false');
    }
});
route();
function setupHomeVideoScroll() {
    const story = document.querySelector('.home-video-scroll');
    const stage = story?.querySelector('.home-video-sticky');
    const media = story?.querySelector('.home-video-media');
    const video = story?.querySelector('video');
    if (!story || !stage || !media || !video)
        return;
    let frame = 0;
    let visible = false;
    const playback = () => {
        if (visible && !document.hidden && !reducedMotion.matches)
            void video.play().catch(() => { });
        else
            video.pause();
    };
    const update = () => {
        frame = 0;
        if (reducedMotion.matches) {
            media.style.transform = 'none';
            return;
        }
        const top = parseFloat(getComputedStyle(stage).top) || 0;
        const distance = Math.max(1, story.offsetHeight - stage.offsetHeight);
        const progress = Math.max(0, Math.min(1, (top - story.getBoundingClientRect().top) / distance));
        media.style.transform = `scale(${.25 + progress * .75})`;
    };
    const schedule = () => { if (!frame)
        frame = requestAnimationFrame(update); };
    const motionChange = () => { schedule(); playback(); };
    const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; playback(); });
    observer.observe(story);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    document.addEventListener('visibilitychange', playback);
    reducedMotion.addEventListener('change', motionChange);
    update();
    cleanupHomeVideoScroll = () => {
        cancelAnimationFrame(frame);
        observer.disconnect();
        video.pause();
        window.removeEventListener('scroll', schedule);
        window.removeEventListener('resize', schedule);
        document.removeEventListener('visibilitychange', playback);
        reducedMotion.removeEventListener('change', motionChange);
    };
}
function setupCeoOverlap() {
    const ceo = document.querySelector('.brand-story + .leadership-dark, .about-editorial');
    if (!ceo)
        return;
    const measure = () => {
        const headerHeight = window.innerWidth <= 760 ? 80 : 104;
        const readingSpace = ceo.matches('.about-editorial') ? 40 : 0;
        ceo.style.setProperty('--ceo-sticky-top', `${Math.min(headerHeight, window.innerHeight - ceo.offsetHeight - readingSpace)}px`);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(ceo);
    window.addEventListener('resize', measure);
    measure();
    cleanupCeoOverlap = () => { observer.disconnect(); window.removeEventListener('resize', measure); };
}
