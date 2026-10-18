import Icon from './Icon';
const steps = [
  ['Discover & plan', 'We listen first. Your business, audience and goals shape a clear strategy.'],
  ['Design & refine', 'We turn the strategy into a creative direction, with your feedback at every step.'],
  ['Build & launch', 'We develop, check and deliver your website, brand or campaign with care.'],
  ['Support & optimize', 'We help you move forward with practical guidance and ongoing improvements.'],
];
export default function ProcessSteps() {
  return <section className="section process-section" aria-labelledby="process-heading"><div className="container"><div className="section-heading"><h2 id="process-heading">Clear steps.<br /><span className="text-muted">Better together.</span></h2><p>Great work is a conversation. Here’s how we take your idea from “what if” to what’s next.</p></div><ol className="process-steps">{steps.map(([name, description], index) => <li key={name}><div className="process-number"><span>0{index + 1}</span><Icon name="right" /></div><h3>{name}</h3><p>{description}</p></li>)}</ol></div></section>;
}
