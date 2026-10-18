import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import Icon from './Icon';

const services = [
  'Branding',
  'Social Media Marketing',
  'Web Designing',
  'IT Solutions',
  'Google Ads',
  'Meta Ads',
  'Zoho Projects',
  'YouTube Marketing',
  'Not sure yet',
] as const;

type Service = (typeof services)[number];
type FormStatus = { kind: 'idle' | 'pending' | 'success' | 'error' | 'draft'; message: string };

export interface ContactFormProps {
  selectedService?: string;
}

function isService(value: unknown): value is Service {
  return typeof value === 'string' && services.some((service) => service === value);
}

/** Relative URLs must start with a single slash; hosted endpoints must use HTTPS. */
function getContactEndpoint(): string | null {
  const configured = import.meta.env.VITE_CONTACT_ENDPOINT?.trim();
  if (!configured || /[\s\\]/.test(configured)) return null;
  if (configured.startsWith('/') && !configured.startsWith('//')) return configured;
  try {
    const url = new URL(configured);
    return url.protocol === 'https:' && !url.username && !url.password ? url.href : null;
  } catch {
    return null;
  }
}

export default function ContactForm({ selectedService }: ContactFormProps) {
  const id = useId();
  const [service, setService] = useState<Service>(isService(selectedService) ? selectedService : 'Not sure yet');
  const [status, setStatus] = useState<FormStatus>({ kind: 'idle', message: '' });
  const [draftHref, setDraftHref] = useState<string | null>(null);
  const request = useRef<AbortController | null>(null);
  const endpoint = getContactEndpoint();
  const pending = status.kind === 'pending';

  useEffect(() => {
    if (!request.current && isService(selectedService)) {
      setService(selectedService);
      setDraftHref(null);
    }
  }, [selectedService]);

  useEffect(() => {
    function chooseService(event: Event) {
      const value: unknown = (event as CustomEvent<unknown>).detail;
      if (!request.current && isService(value)) {
        setService(value);
        setDraftHref(null);
        setStatus({ kind: 'idle', message: '' });
      }
    }
    window.addEventListener('moon:service', chooseService);
    return () => {
      window.removeEventListener('moon:service', chooseService);
      request.current?.abort();
    };
  }, []);

  function clearDraft() {
    if (request.current) return;
    setDraftHref(null);
    if (!pending) setStatus({ kind: 'idle', message: '' });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending || request.current) return;
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const fullName = String(data.get('fullName') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const phone = String(data.get('phone') ?? '').trim();
    const goals = String(data.get('goals') ?? '').trim();
    setDraftHref(null);

    const nameField = form.elements.namedItem('fullName') as HTMLInputElement;
    const goalsField = form.elements.namedItem('goals') as HTMLTextAreaElement;
    nameField.setCustomValidity(fullName.length < 2 ? 'Please enter your name, using at least two characters.' : '');
    goalsField.setCustomValidity(goals.length < 20 ? 'Please describe your project in at least 20 characters.' : '');
    if (!form.reportValidity()) return;

    if (!endpoint) {
      const subject = `Project enquiry: ${service}`;
      const body = [
        'Hello Mooncrafters,',
        '',
        goals,
        '',
        `Name: ${fullName}`,
        `Email: ${email}`,
        ...(phone ? [`Phone: ${phone}`] : []),
        `Interested in: ${service}`,
      ].join('\n');
      setDraftHref(`mailto:mooncrafters@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
      setStatus({
        kind: 'draft',
        message: 'Your draft is ready. No enquiry has been sent yet. Open your email app, review the draft, and send it.',
      });
      return;
    }

    if (String(data.get('website') ?? '').trim()) {
      setStatus({ kind: 'error', message: 'We could not submit this enquiry. Please email mooncrafters@gmail.com directly.' });
      return;
    }

    const controller = new AbortController();
    request.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    setStatus({ kind: 'pending', message: 'Submitting your enquiry…' });
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ fullName, email, phone, service, goals, website: '' }),
        signal: controller.signal,
      });
      if (!response.ok) throw new Error('Submission failed');
      setStatus({ kind: 'success', message: 'Your enquiry has been submitted. Thank you for getting in touch with Mooncrafters.' });
    } catch {
      setStatus({
        kind: 'error',
        message: 'We could not confirm your submission. Please try again or email mooncrafters@gmail.com directly.',
      });
    } finally {
      window.clearTimeout(timeout);
      if (request.current === controller) request.current = null;
    }
  }

  return (
    <form
      className="contact-form"
      action="mailto:mooncrafters@gmail.com"
      method="post"
      encType="text/plain"
      onSubmit={handleSubmit}
      onChange={clearDraft}
      aria-label="Project enquiry"
      aria-busy={pending}
    >
      <h3>Let’s get started.</h3>
      <p>A new website, a sharper brand, or your next big idea.</p>
      <div className="form-grid">
        <div className="field">
          <label htmlFor={`${id}-name`}>Full name <span aria-hidden="true">*</span></label>
          <input
            id={`${id}-name`}
            name="fullName"
            autoComplete="name"
            placeholder="Your name"
            required
            minLength={2}
            maxLength={100}
            disabled={pending}
            onInput={(event) => event.currentTarget.setCustomValidity('')}
          />
        </div>
        <div className="field">
          <label htmlFor={`${id}-email`}>Email address <span aria-hidden="true">*</span></label>
          <input id={`${id}-email`} name="email" type="email" autoComplete="email" placeholder="you@company.com" required maxLength={254} disabled={pending} />
        </div>
        <div className="field">
          <label htmlFor={`${id}-phone`}>Phone <span className="field-optional">(optional)</span></label>
          <input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+91 98765 43210"
            pattern={String.raw`\+?[\d\s\(\)\.\-]{7,25}`}
            title="Use 7–25 characters: digits, spaces, parentheses, dots or hyphens, with an optional leading +."
            maxLength={25}
            disabled={pending}
          />
        </div>
        <div className="field">
          <label htmlFor={`${id}-service`}>What can we help with?</label>
          <select id={`${id}-service`} name="service" value={service} onChange={(event) => setService(event.target.value as Service)} disabled={pending}>
            {services.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </div>
        <div className="field field-full">
          <label htmlFor={`${id}-goals`}>Tell us about your project <span aria-hidden="true">*</span></label>
          <textarea
            id={`${id}-goals`}
            name="goals"
            placeholder="What are you building, and where would you like to go?"
            rows={5}
            required
            minLength={20}
            maxLength={3000}
            disabled={pending}
            onInput={(event) => event.currentTarget.setCustomValidity('')}
            aria-describedby={`${id}-note`}
          />
        </div>
      </div>
      <div hidden aria-hidden="true">
        <label htmlFor={`${id}-website`}>Leave this field empty</label>
        <input id={`${id}-website`} name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <p id={`${id}-note`} className="form-note">
        {endpoint
          ? 'Fields marked * are required. Your details will be used to respond to your enquiry.'
          : 'Fields marked * are required. This prepares an email draft. You will need to review and send it from your email app.'}
      </p>
      <noscript><p className="form-note">Submitting this form opens your email app. Please review and send the email there, or email mooncrafters@gmail.com directly.</p></noscript>
      <button className="button button-lime" type="submit" disabled={pending}>
        {pending ? 'Submitting…' : endpoint ? 'Send enquiry' : 'Prepare enquiry email'}
        <Icon name="arrow" />
      </button>
      <div className={`form-status${status.kind === 'error' ? ' form-status-error' : ''}`} role="status" aria-live="polite" aria-atomic="true">
        {status.message && <p>{status.message}</p>}
      </div>
      {draftHref && <a className="button button-outline" href={draftHref}>Open email app to send <Icon name="arrow" /></a>}
    </form>
  );
}
