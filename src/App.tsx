import Header from './components/Header';
import Hero from './components/Hero';
import ServicesSection from './components/ServicesSection';
import ProcessSteps from './components/ProcessSteps';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import Icon from './components/Icon';
import { contact } from './content';

function AboutSection() {
  return <section className="section about-section" id="about" aria-labelledby="about-heading"><div className="container about-grid"><div className="about-intro"><h2 id="about-heading">Your ambition.<br />Our kind of project.</h2><p>We’re Mooncrafters, a team bringing design, digital marketing and technology together. We believe your growth starts with listening, and good work comes from getting the details right.</p><a href="#contact" className="text-link">Start a conversation <Icon name="arrow" /></a><div className="team-signoff"><div className="team-portraits"><img src="/images/tej.webp" width="48" height="48" loading="lazy" alt="Chippada Tej Kumar" /><img src="/images/malla.webp" width="48" height="48" loading="lazy" alt="Malla Krishnachaitanya" /></div><p><strong>Chippada Tej Kumar &<br />Malla Krishnachaitanya</strong><span>CEOs, Moon Crafters Solutions</span></p></div></div><div className="about-principles"><article><span className="principle-icon coral-icon"><Icon name="social" /></span><div><h3>Your goals set the direction.</h3><p>We understand your business before recommending a service. Every decision starts with what you want to achieve.</p></div></article><article><span className="principle-icon cyan-icon"><Icon name="projects" /></span><div><h3>Connected from the start.</h3><p>Design, marketing and technology work toward one purpose, so your digital presence feels like one brand.</p></div></article><article><span className="principle-icon lime-icon"><Icon name="check" /></span><div><h3>Thoughtful work. Open conversations.</h3><p>Clear steps, focused feedback and practical support keep you involved from the first idea to what comes next.</p></div></article></div></div></section>;
}
export function ProjectCard({ name, image }: { name: string; image: string }) {
  return <div className={`client-logo client-${name.toLowerCase()}`}><img src={image} alt={name} width="210" height="95" loading="lazy" /></div>;
}
function WorkSection() {
  return <section className="section work-section" id="work" aria-labelledby="work-heading"><div className="container work-grid"><div><h2 id="work-heading">Good company.<br /><span className="text-muted">Shared possibilities.</span></h2><p>A few of the names in our client community.</p><a href="#contact" className="text-link">Talk about your project <Icon name="arrow" /></a></div><div className="client-proof"><div className="client-logos"><ProjectCard name="Swiggy" image="/images/swiggy.webp" /><ProjectCard name="Ayantech" image="/images/ayantech.webp" /></div><p>Have something in mind? Let’s discuss the approach that’s right for your business.</p></div></div></section>;
}
function ContactSection() {
  return <section className="section contact-section" id="contact" aria-labelledby="contact-heading"><div className="container contact-grid"><div className="contact-copy"><h2 id="contact-heading">Big idea?<br /><span>Let’s make<br />it happen.</span></h2><p>Tell us where you want to go. We’ll start with a free conversation and find a way forward, together.</p><div className="contact-details"><a href={`mailto:${contact.email}`}><Icon name="mail" /><span><small>WRITE TO US</small>{contact.email}</span><Icon name="arrow" /></a><a href={contact.phoneLink}><Icon name="phone" /><span><small>GIVE US A CALL</small>{contact.phone}</span><Icon name="arrow" /></a><div><Icon name="pin" /><span><small>COME SAY HELLO</small>{contact.address}</span></div></div></div><ContactForm /></div></section>;
}
export default function App() {
  return <><a className="skip-link" href="#main">Skip to content</a><Header /><main id="main"><Hero /><ServicesSection /><AboutSection /><ProcessSteps /><WorkSection /><ContactSection /></main><Footer /></>;
}
