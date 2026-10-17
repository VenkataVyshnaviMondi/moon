"use strict";
const careerGroups = [
    { name: 'Business Development', roles: [{ name: 'Sales Development Representative', experience: '2–4 years' }] },
    { name: 'Marketing', roles: [{ name: 'Marketing Manager', experience: '6+ years' }, { name: 'Marketing Executive', experience: '0–2 years' }] },
    { name: 'Digital Marketing', roles: [{ name: 'Social Media Executive', experience: '0–1 year' }, { name: 'Performance Marketing Executive', experience: '0–1 year' }] },
    { name: 'IT Services', roles: [{ name: 'Web Developer', experience: '0–1 year' }] }
];
function careerOpenings() {
    const roles = careerGroups.flatMap(group => group.roles);
    return `<section class="section openings career-openings"><h2>Current openings</h2>${careerGroups.map(group => `<details open><summary>${group.name} (${group.roles.length})</summary>${group.roles.map(role => `<div class="career-opening-row"><h3>${role.name}</h3><p>${role.experience}</p><button type="button" data-apply-role="${role.name}"><span aria-hidden="true">&#8594;</span> Apply now</button></div>`).join('')}</details>`).join('')}</section>
 <dialog class="career-dialog" aria-labelledby="career-application-title"><button type="button" class="career-close" aria-label="Close application">&#215;</button><h2 id="career-application-title">Apply to Moon Crafters</h2><p class="career-form-intro">Tell us about yourself and the role you’re interested in.</p>
 <form id="career-application" class="career-form">
 <label>First Name *<input name="firstName" autocomplete="given-name" required maxlength="100"></label>
 <label>Last Name<input name="lastName" autocomplete="family-name" maxlength="100"></label>
 <label>Email *<input name="email" type="email" autocomplete="email" required maxlength="254"></label>
 <label>Phone Number *<input name="phone" type="tel" autocomplete="tel" inputmode="tel" pattern="[0-9+() -]{10,20}" title="Enter a phone number with 10 to 20 digits or phone symbols" required></label>
 <label>State<select name="state"><option value="">Select state</option>${careerLocations.states.map(item => `<option>${item.state}</option>`).join('')}</select></label>
 <label>Place (district)<select name="district" disabled><option value="">Select a state first</option></select></label>
 <label class="career-full">Applying For *<select name="role" required><option value="">Select a role</option>${roles.map(role => `<option>${role.name}</option>`).join('')}</select></label>
 <label>Years of Experience<input name="experience" type="number" min="0" max="60" step="0.5" placeholder="e.g. 1"></label>
 <label>Qualification<input name="qualification" maxlength="200" placeholder="Your highest qualification"></label>
 <label class="career-full">Add an attachment *<input name="attachment" type="file" accept=".pdf,.png,.jpg,.jpeg,.docx" required aria-describedby="career-file-help"><small id="career-file-help">Max. 10 MB. Types: pdf, png, jpeg, docx.</small></label>
 <label class="career-consent career-full"><input type="checkbox" name="consent" required><span>I have read the <a href="https://webandcrafts.com/privacy-policy" target="_blank" rel="noopener noreferrer">privacy policy</a> and consent to the processing of my data for the purpose of handling my enquiry.</span></label>
 <p class="career-full career-delivery-note">This opens an email draft. Please attach your selected file to the email before sending your application.</p>
 <p id="career-application-status" class="career-full" role="status"></p>
 <button class="career-submit" type="submit">Prepare application email <span aria-hidden="true">&#8599;</span></button>
 </form></dialog>`;
}
function setupCareerApplications() {
    const dialog = document.querySelector('.career-dialog');
    const form = document.querySelector('#career-application');
    if (!dialog || !form)
        return;
    const field = (name) => form.elements.namedItem(name);
    const role = field('role');
    let trigger = null;
    document.querySelectorAll('[data-apply-role]').forEach(button => button.onclick = () => {
        trigger = button;
        role.value = button.dataset.applyRole || '';
        dialog.showModal();
        document.body.classList.add('career-modal-open');
    });
    dialog.querySelector('.career-close').onclick = () => dialog.close();
    dialog.addEventListener('click', event => { if (event.target === dialog) {
        const r = dialog.getBoundingClientRect();
        if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom)
            dialog.close();
    } });
    dialog.addEventListener('close', () => { document.body.classList.remove('career-modal-open'); trigger?.focus(); });
    // A route change removes the dialog; never leave scrolling locked on the next page.
    window.addEventListener('hashchange', () => document.body.classList.remove('career-modal-open'), { once: true });
    const state = field('state');
    const district = field('district');
    state.onchange = () => {
        const districts = careerLocations.states.find(item => item.state === state.value)?.districts || [];
        district.replaceChildren(new Option(districts.length ? 'Select district' : 'Select a state first', ''), ...districts.map(name => new Option(name, name)));
        district.disabled = !districts.length;
    };
    const attachment = field('attachment');
    attachment.onchange = () => {
        const file = attachment.files?.[0];
        attachment.setCustomValidity(file && file.size > 10 * 1024 * 1024 ? 'Please choose a file no larger than 10 MB.' : file && !/\.(pdf|png|jpe?g|docx)$/i.test(file.name) ? 'Please choose a PDF, PNG, JPEG or DOCX file.' : '');
        attachment.reportValidity();
    };
    form.onsubmit = event => {
        event.preventDefault();
        if (!form.reportValidity())
            return;
        const data = new FormData(form);
        const body = ['Job application', ...[['First Name', 'firstName'], ['Last Name', 'lastName'], ['Email', 'email'], ['Phone Number', 'phone'], ['State', 'state'], ['District', 'district'], ['Applying For', 'role'], ['Years of Experience', 'experience'], ['Qualification', 'qualification']].map(([label, key]) => `${label}: ${data.get(key) || 'Not provided'}`), `Attachment to add manually: ${attachment.files?.[0]?.name}`, 'Privacy consent: given'].join('\n');
        const url = `https://mail.google.com/mail/?view=cm&fs=1&to=venkatavyshnavimondi%40gmail.com&su=${encodeURIComponent('Application — ' + role.value)}&body=${encodeURIComponent(body)}`;
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = 'Open application email';
        const status = document.querySelector('#career-application-status');
        status.replaceChildren(document.createTextNode('Your application has not been sent. Attach your file and send it in your email app. '), link);
        window.open(url, '_blank', 'noopener,noreferrer');
    };
}
