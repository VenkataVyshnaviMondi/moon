const careerGroups = [
 {name:'Operations', roles:[{name:'Executive', experience:'Work from home'}]}
];
function careerOpenings(): string {
 const roles = careerGroups.flatMap(group => group.roles);
 return `<section class="section openings career-openings"><h2>Current openings</h2>${careerGroups.map(group => `<details open><summary>${group.name} (${group.roles.length})</summary>${group.name === 'Operations' ? '<div class="career-opening-head" aria-hidden="true"><span>Role</span><span>Work mode</span><span>Action</span></div>' : ''}${group.roles.map(role => `<div class="career-opening-row"><h3>${role.name}</h3><p>${role.experience}</p><button type="button" data-apply-role="${role.name}"><span aria-hidden="true">&#8594;</span> Apply now</button></div>`).join('')}</details>`).join('')}</section>
 <dialog class="career-job-details career-dialog" aria-labelledby="executive-job-title"><button type="button" class="career-close" aria-label="Close job details">&#215;</button><h2 id="executive-job-title">Executive</h2><p class="career-work-mode">Work from home</p><h3>What you?ll need</h3><ul><li>Personal laptop/PC with stable internet connection</li><li>Any bachelor?s degree or equivalent diploma</li><li>Basic computer proficiency in MS Office, email, and web browsers</li><li>Good English communication skills</li></ul><button type="button" class="career-submit" data-continue-application>Continue to application <span aria-hidden="true">&#8594;</span></button></dialog>
 <dialog class="career-dialog career-application-dialog" aria-labelledby="career-application-title"><button type="button" class="career-close" aria-label="Close application">&#215;</button><h2 id="career-application-title">Apply to Moon Crafters</h2><p class="career-form-intro">Tell us about yourself and the role you’re interested in.</p>
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
 <label class="career-full">Resume URL *<input name="resumeUrl" type="url" placeholder="https://drive.google.com/..." required maxlength="2048" aria-describedby="career-resume-help career-resume-error"><small id="career-resume-help">Paste a full http:// or https:// link to your resume. Enable sharing so our team can open it.</small><small id="career-resume-error" role="alert" class="career-resume-error"></small></label>
 <p id="career-application-status" class="career-full" role="status"></p>
 <button class="career-submit" type="submit">Prepare application email <span aria-hidden="true">&#8599;</span></button>
 </form></dialog>`;
}
function setupCareerApplications(): void {
 const dialog = document.querySelector<HTMLDialogElement>('.career-application-dialog');
 const form = document.querySelector<HTMLFormElement>('#career-application');
 if (!dialog || !form) return;
 const field = <T extends HTMLElement>(name: string): T => form.elements.namedItem(name) as T;
 const role = field<HTMLSelectElement>('role');
 const details = document.querySelector<HTMLDialogElement>('.career-job-details')!;
 let trigger: HTMLButtonElement | null = null;
 document.querySelectorAll<HTMLButtonElement>('[data-apply-role]').forEach(button => button.onclick = () => {
  trigger = button;
  role.value = button.dataset.applyRole || '';
  if (role.value === 'Executive') details.showModal();
  else dialog.showModal();
  document.body.classList.add('career-modal-open');
 });
 details.querySelector<HTMLButtonElement>('.career-close')!.onclick = () => details.close();
 details.addEventListener('close', () => {if (!dialog.open) {document.body.classList.remove('career-modal-open'); trigger?.focus();}});
 details.querySelector<HTMLButtonElement>('[data-continue-application]')!.onclick = () => {
  dialog.showModal();
  details.close();
  document.body.classList.add('career-modal-open');
  field<HTMLInputElement>('firstName').focus();
 };
 dialog.querySelector<HTMLButtonElement>('.career-close')!.onclick = () => dialog.close();
 dialog.addEventListener('click', event => {if (event.target === dialog) {const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();}});
 dialog.addEventListener('close', () => {document.body.classList.remove('career-modal-open'); trigger?.focus();});
 // A route change removes the dialog; never leave scrolling locked on the next page.
 window.addEventListener('hashchange', () => document.body.classList.remove('career-modal-open'), {once:true});
 const state = field<HTMLSelectElement>('state');
 const district = field<HTMLSelectElement>('district');
 state.onchange = () => {
  const districts = careerLocations.states.find(item => item.state === state.value)?.districts || [];
  district.replaceChildren(new Option(districts.length ? 'Select district' : 'Select a state first', ''), ...districts.map(name => new Option(name, name)));
  district.disabled = !districts.length;
 };
 const resumeUrl = field<HTMLInputElement>('resumeUrl');
 const resumeError = document.querySelector<HTMLElement>('#career-resume-error')!;
 const validateResume = (): boolean => {
  resumeUrl.value = resumeUrl.value.trim();
  const valid = isValidResumeUrl(resumeUrl.value);
  const message = valid ? '' : 'Enter a valid resume link starting with http:// or https:// (for example, https://drive.google.com/...).';
  resumeUrl.setCustomValidity(message);
  resumeUrl.setAttribute('aria-invalid', String(!valid));
  resumeError.textContent = message;
  return valid;
 };
 resumeUrl.oninput = () => {
  resumeUrl.setCustomValidity('');
  resumeUrl.removeAttribute('aria-invalid');
  resumeError.textContent = '';
 };
 resumeUrl.onblur = () => {validateResume();};
 form.onsubmit = event => {
  event.preventDefault();
  const validResume = validateResume();
  if (!form.reportValidity() || !validResume) return;
  const data = new FormData(form);
  const body = ['Job application', ...[['First Name','firstName'],['Last Name','lastName'],['Email','email'],['Phone Number','phone'],['State','state'],['District','district'],['Applying For','role'],['Years of Experience','experience'],['Qualification','qualification']].map(([label,key]) => `${label}: ${data.get(key) || 'Not provided'}`), `Resume URL: ${resumeUrl.value}`].join('\n');
  const url = `https://mail.google.com/mail/?view=cm&fs=1&to=venkatavyshnavimondi%40gmail.com&su=${encodeURIComponent('Application — '+role.value)}&body=${encodeURIComponent(body)}`;
  const link = document.createElement('a');link.href=url;link.target='_blank';link.rel='noopener noreferrer';link.textContent='Open application email';
  const status = document.querySelector<HTMLElement>('#career-application-status')!;
  status.replaceChildren(document.createTextNode('Your application has not been sent. Review your details and resume link, then press Send in Gmail. '),link);
  window.open(url, '_blank', 'noopener,noreferrer');
 };
}


function isValidResumeUrl(value: string): boolean {
 try {
  const url = new URL(value.trim());
  return (url.protocol === 'https:' || url.protocol === 'http:') &&
   !url.username && !url.password && url.hostname.includes('.') &&
   !/\s/.test(value.trim()) && url.hostname.split('.').every(part => /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(part));
 } catch {return false;}
}
