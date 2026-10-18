import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';
export function Brand({ footer = false }: { footer?: boolean }) {
  return <a className={`brand${footer ? ' brand-footer' : ''}`} href="#home" aria-label="Mooncrafters home"><img src="/images/brand-mark.webp" width="44" height="40" alt="" /><span>mooncrafters<span className="brand-dot">.</span></span></a>;
}
export default function Header() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') { setOpen(false); buttonRef.current?.focus(); } };
    const outside = (event: PointerEvent) => { if (!(event.target as Element).closest('.site-header')) setOpen(false); };
    document.addEventListener('keydown', close); document.addEventListener('pointerdown', outside);
    return () => { document.removeEventListener('keydown', close); document.removeEventListener('pointerdown', outside); };
  }, [open]);
  return <header className="site-header"><div className="container header-inner"><Brand /><button ref={buttonRef} className={`menu-toggle${open ? ' is-open' : ''}`} type="button" aria-expanded={open} aria-controls="main-navigation" aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen(!open)}><span /><span /></button><nav id="main-navigation" className={open ? 'navigation is-open' : 'navigation'} aria-label="Main navigation">{['Services', 'About', 'Work', 'Contact'].map(label => <a key={label} href={`#${label.toLowerCase()}`} onClick={() => setOpen(false)}>{label}</a>)}<a href="#contact" className="button button-lime header-cta" onClick={() => setOpen(false)}>Book a Free Consultation <Icon name="arrow" /></a></nav></div></header>;
}
