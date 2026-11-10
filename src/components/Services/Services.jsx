import './Services.css'

const contentTypes = ['Talking videos & tutorials', 'Fashion, beauty & makeup', 'Product showcases & setups', 'Cooking & process videos', 'Lifestyle content & mini-vlogs', 'Reels, TikToks & Shorts']
const editingScope = ['Reviewing every raw clip', 'Selecting the strongest moments', 'Hooks & story structure', 'Clean cuts & pacing', 'Captions & on-screen text', 'Speed, transitions & sound', 'Finishing & platform exports']

export default function Services() {
  return <section id="services" className="services" aria-labelledby="services-title"><div className="page-width">
    <div className="section-heading"><span className="eyebrow">02 / Services</span><div><h2 id="services-title">Built for creator-led content.</h2><p className="services-intro">I work with creators who want consistent, polished short-form content without spending their own time reviewing footage and building every edit.</p></div></div>
    <div className="service-columns">
      <div className="service-column"><span className="eyebrow">Content I edit</span><ul>{contentTypes.map((item, index) => <li key={item}><span className="eyebrow">0{index + 1}</span>{item}</li>)}</ul></div>
      <div className="service-column"><span className="eyebrow">What I handle</span><ul>{editingScope.map((item, index) => <li key={item}><span className="eyebrow">0{index + 1}</span>{item}</li>)}</ul></div>
    </div>
    <div className="services-note"><span className="eyebrow">My approach</span><p>Your videos should feel more polished while still feeling unmistakably like <em>your content.</em></p></div>
  </div></section>
}
