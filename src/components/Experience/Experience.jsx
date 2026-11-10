import './Experience.css'

const steps = [
  ['Send the footage', 'Share your raw files, brief, references, and any brand assets.'],
  ['I build the edit', 'I review everything, find the strongest moments, and shape the first cut.'],
  ['Review together', 'You leave clear feedback on the video so revisions stay simple and specific.'],
  ['Receive post-ready files', 'The approved edit is delivered in the right format for your platforms.'],
]

export default function Experience() {
  return <section id="process" className="experience page-width" aria-labelledby="process-title">
    <div className="section-heading"><span className="eyebrow">03 / Process</span><div><h2 id="process-title">Simple from upload<br />to approval.</h2><p className="process-intro">Your part can end after filming. I handle the reviewing, selecting, structuring, cutting, captions, sound, and finishing.</p></div></div>
    <ol className="process-list">{steps.map(([title, copy], index) => <li key={title}><span className="step-number eyebrow">0{index + 1}</span><h3>{title}</h3><p>{copy}</p></li>)}</ol>
    <div className="about-panel">
      <span className="eyebrow">About Samy</span>
      <div className="about-copy"><h2>Editing that fits<br />the creator.</h2><p>I’m a short-form editor focused on clean, purposeful creator content. I adapt the pacing, captions, sound, and visual treatment to each creator’s existing voice instead of forcing every client into one editing style.</p><p>My graphic-design background supports stronger typography and composition. My technical background keeps the working process organized and dependable.</p><a href="#contact">Discuss your content <span aria-hidden="true">↘</span></a></div>
    </div>
  </section>
}
