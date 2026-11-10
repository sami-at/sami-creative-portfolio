import Arrow from '../shared/Arrow'
import './Work.css'

const formats = [
  { number: '01', title: 'Talking & tutorials', note: 'Hooks, clean pacing, captions' },
  { number: '02', title: 'Product & beauty', note: 'Details, movement, sound design' },
  { number: '03', title: 'Lifestyle & mini-vlogs', note: 'Selection, rhythm, story flow' },
]

export default function Work() {
  return <section className="work" id="work" aria-labelledby="work-title">
    <div className="page-width">
      <div className="section-heading">
        <span className="eyebrow">01 / Selected work</span>
        <div><h2 id="work-title">Short-form work,<br />selected for your niche.</h2><p className="section-intro">Creator edits are shared privately while public publishing permissions are being prepared. Tell me what you create and I’ll send the most relevant examples.</p></div>
      </div>
      <div className="private-reel">
        <div className="private-reel-copy">
          <span className="eyebrow">Private creator reel</span>
          <h3>See editing that matches the content you make.</h3>
          <p>Request a focused selection of short-form edits instead of searching through unrelated work.</p>
          <a className="light-button" href="#contact">Request relevant samples <Arrow /></a>
        </div>
        <div className="format-list" aria-label="Available editing sample categories">
          {formats.map(format => <div className="format-row" key={format.number}>
            <span className="eyebrow">{format.number}</span><strong>{format.title}</strong><span>{format.note}</span>
          </div>)}
        </div>
      </div>
    </div>
    <div className="breakdown page-width" id="breakdown">
      <div className="section-heading">
        <span className="eyebrow">Raw footage → final edit</span>
        <div><h2>What happens between<br />raw and ready.</h2><p className="section-intro">The value is in the decisions: finding the hook, choosing what stays, shaping the rhythm, and making every second earn its place.</p></div>
      </div>
      <div className="edit-flow">
        <div className="flow-stage raw-stage"><div className="stage-heading"><span className="eyebrow">01 / Raw</span><strong>Everything you filmed</strong></div><div className="raw-clips" aria-hidden="true">{Array.from({ length: 12 }, (_, i) => <span key={i} />)}</div><p>Multiple takes, pauses, setups, details, and spontaneous moments.</p></div>
        <div className="flow-arrow" aria-hidden="true">→</div>
        <div className="flow-stage select-stage"><div className="stage-heading"><span className="eyebrow">02 / Select</span><strong>The strongest moments</strong></div><div className="select-track" aria-hidden="true"><span /><span /><span /><span /><span /></div><p>The hook, essential context, best delivery, visual detail, and clean ending.</p></div>
        <div className="flow-arrow" aria-hidden="true">→</div>
        <div className="flow-stage final-stage"><div className="stage-heading"><span className="eyebrow">03 / Finish</span><strong>Post-ready short</strong></div><div className="final-screen"><span>HOOK</span><strong>Clear story.<br /><em>Clean cut.</em></strong><small>CAPTIONS / SOUND / PACING</small></div><p>Structured, polished, reviewed, and exported for your platform.</p></div>
      </div>
      <div className="decision-list">
        <div><span className="eyebrow">Clip selection</span><p>Find the expressions, details, and moments that move the story forward.</p></div>
        <div><span className="eyebrow">Pacing</span><p>Tighten pauses and repetition without making the edit feel rushed.</p></div>
        <div><span className="eyebrow">Finishing</span><p>Add captions, sound, speed changes, and effects only where they help.</p></div>
      </div>
    </div>
  </section>
}
