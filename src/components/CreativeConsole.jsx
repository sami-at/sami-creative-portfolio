import { useEffect, useRef, useState } from 'react'
import './CreativeConsole.css'

const opening = 'export default function Experience() {\n  return (\n'
const firstCode = `${opening}    <main className="studio">\n      <h1>Ideas come to life.</h1>\n      <Button>Explore my work</Button>\n    </main>\n  );\n}`
const secondCode = `${opening}    <motion.main animate="visible">\n      <h1>Made to move.</h1>\n      <Button>Let’s build it</Button>\n    </motion.main>\n  );\n}`

function codeFrame(time) {
  const t = time % 22000
  if (t < 6500) return { text: firstCode.slice(0, 21 + Math.floor(t / 6500 * (firstCode.length - 21))), status: 'Writing the first idea', progress: t / 6500 }
  if (t < 8500) return { text: firstCode, status: 'Preview ready', progress: 1 }
  if (t < 11000) return { text: firstCode.slice(0, firstCode.length - Math.floor((t - 8500) / 2500 * (firstCode.length - opening.length))), status: 'Refining the details', progress: .6 }
  if (t < 17000) return { text: secondCode.slice(0, opening.length + Math.floor((t - 11000) / 6000 * (secondCode.length - opening.length))), status: 'Adding a little motion', progress: (t - 11000) / 6000, refined: true }
  if (t < 19500) return { text: secondCode, status: 'Built to feel different', progress: 1, refined: true }
  return { text: secondCode.slice(0, secondCode.length - Math.floor((t - 19500) / 2500 * (secondCode.length - 21))), status: 'Another idea, another iteration', progress: .6, refined: true }
}

function Highlight({ text }) {
  return text.split(/("[^"]*"|\b(?:export|default|function|return)\b|<\/?[\w.]+|[{}();])/g).map((token, index) => {
    const kind = token.startsWith('"') ? 'string' : token.startsWith('<') ? 'tag' : /^(export|default|function|return)$/.test(token) ? 'keyword' : 'plain'
    return <span key={index} className={`syntax-${kind}`}>{token}</span>
  })
}

function CodeEditor({ elapsed, reduced }) {
  const frame = codeFrame(reduced ? 18000 : elapsed)
  const lines = frame.text.split('\n')
  return <div className="code-demo" aria-hidden="true">
    <div className="console-file"><span>⌘</span> Experience.jsx <span className="file-modified">●</span><span className="console-language">React</span></div>
    <div className="code-workspace">
      <div className="code-lines">{lines.map((line, index) => <div className="code-line" key={index}><span className="line-number">{String(index + 1).padStart(2, '0')}</span><code><Highlight text={line} />{index === lines.length - 1 && <i className="typing-caret" />}</code></div>)}</div>
      <div className={`code-preview ${frame.refined ? 'preview-refined' : ''}`}>
        <span className="preview-label">LIVE PREVIEW ↗</span>
        <div className="preview-orbit"><i /><i /><i /></div>
        <strong style={{ opacity: frame.progress > .25 ? 1 : .2 }}>{frame.refined ? <>Made<br />to move.</> : <>Ideas come<br />to life.</>}</strong>
        <span className="preview-button" style={{ opacity: frame.progress > .7 ? 1 : .15 }}>Explore <span>↗</span></span>
        <div className="preview-build"><span style={{ transform: `scaleX(${Math.max(.04, frame.progress)})` }} /></div>
      </div>
    </div>
    <div className="console-status"><span><i />{frame.status}</span><span>{frame.progress === 1 ? '✓ Compiled' : '↻ Creating'}</span></div>
  </div>
}

const wavePath = Array.from({ length: 150 }, (_, index) => {
  const height = 2 + Math.abs(Math.sin(index * .71) * Math.cos(index * .23)) * 12
  return `M${index * 4} ${15 - height}v${height * 2}`
}).join(' ')

function EditingTimeline({ elapsed, reduced, stage }) {
  const raw = stage === 'raw'
  const time = reduced ? 4200 : elapsed % 12000
  const progress = time / 12000
  const shot = Math.floor(time / 3000)
  const caption = Math.floor((reduced ? 4200 : elapsed % 10000) / 2500)
  const timecode = `00:00:${String(Math.floor(time / 1000)).padStart(2, '0')}:${String(Math.floor(time % 1000 / (1000 / 24))).padStart(2, '0')}`
  return <div className="editing-demo" data-stage={raw ? 'raw' : 'final'} aria-hidden="true">
    <div className="console-file"><span>◈</span> {raw ? 'Source footage / uncut' : 'A story in the making'}<span className="console-language">24 FPS</span></div>
    <div className="edit-monitor">
      <div className={`edit-footage shot-${shot}`}><img src="/visuals/mountain-timeline.jpg" alt="" style={{ transform: `scale(${1.45 + progress * .18}) translate(${Math.sin(progress * Math.PI * 2) * 3}%, -11%)` }} /><span className="monitor-corner">REC <i /></span><span key={caption} className="edit-caption">{['Every story', 'starts with a moment.', 'Find the rhythm.', 'Make it matter.'][caption]}</span><span className="monitor-ratio">9:16 / SEQUENCE 01</span></div>
      <div className="audio-meter"><span>dB</span>{[0, 1, 2, 3].map(i => <i key={i}><b style={{ transform: `scaleY(${.22 + Math.abs(Math.sin(time / 230 + i * 1.4)) * .78})` }} /></i>)}<small>−∞</small></div>
    </div>
    <div className="timeline-toolbar"><span>▶ <b>{timecode}</b></span><span>SEQUENCE 01 <span className="timeline-tools">⌘ &nbsp; ✂ &nbsp; ⊕</span></span></div>
    <div className="timeline-tracks">
      <div className="track-labels"><span /><span>V1</span><span>FX</span><span>A1</span></div>
      <div className="track-viewport">
        <div className="timeline-ruler"><span>00:00</span><span>00:04</span><span>00:08</span><span>00:12</span></div>
        <div className="track-content" style={{ transform: `translateX(${-progress * 65}px)` }}>
          <div className="video-track">{(raw ? ['SOURCE FOOTAGE / TAKE 01'] : ['THE OPENING', 'A NEW PERSPECTIVE', 'THE MOMENT', 'ONE MORE CUT']).map((label, i) => <span key={label} className={shot === i ? 'active-clip' : ''}><i />{label}</span>)}</div>
          <div className="effects-track"><span>Caption / hook</span><span>Color grade</span><span>Sound design</span></div>
          <div className="waveform-track"><svg viewBox="0 0 600 30" preserveAspectRatio="none"><path d={wavePath} /></svg></div>
        </div>
        <div className="timeline-playhead" style={{ left: `${5 + progress * 88}%` }}><i /></div>
      </div>
    </div>
    <div className="console-status"><span><i />{raw ? 'Reviewing source footage' : ['Finding the hook', 'Shaping the story', 'Building the rhythm', 'The finishing touches'][shot]}</span><span>{raw ? 'Original take' : 'Picture + sound'}</span></div>
  </div>
}

export default function CreativeConsole({ mode, stage }) {
  const ref = useRef(null)
  const clock = useRef(0)
  const [elapsed, setElapsed] = useState(0)
  const [paused, setPaused] = useState(false)
  const [visible, setVisible] = useState(false)
  const [tab, setTab] = useState(mode === 'web' ? 'web' : 'video')
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [pageVisible, setPageVisible] = useState(() => !document.hidden)
  const running = visible && pageVisible && !paused && !reduced

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onPreference = event => setReduced(event.matches)
    const onVisibility = () => setPageVisible(!document.hidden)
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .1 })
    observer.observe(ref.current)
    preference.addEventListener('change', onPreference)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      observer.disconnect()
      preference.removeEventListener('change', onPreference)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  useEffect(() => {
    if (!running) return
    let previous = performance.now()
    const timer = window.setInterval(() => {
      const now = performance.now()
      clock.current += Math.min(now - previous, 100)
      previous = now
      setElapsed(clock.current)
    }, 50)
    return () => window.clearInterval(timer)
  }, [running])

  return <aside ref={ref} className={`creative-console console-${tab}`} data-running={running} aria-label="Creative process animation">
    <div className="console-chrome">
      <span className="console-lights" aria-hidden="true"><i /><i /><i /></span>
      {mode === 'home' ? <div className="console-tabs" aria-label="Preview discipline"><button aria-pressed={tab === 'video'} onClick={() => setTab('video')}>Edit</button><button aria-pressed={tab === 'web'} onClick={() => setTab('web')}>Build</button></div> : <span className="console-title">{mode === 'web' ? 'IDEA → INTERFACE' : 'FOOTAGE → FEELING'}</span>}
      <button className="console-pause" disabled={reduced} aria-label={reduced ? 'Reduced motion enabled' : paused ? 'Play animation' : 'Pause animation'} aria-pressed={paused || reduced} onClick={() => setPaused(value => !value)}>{paused || reduced ? '▶' : 'Ⅱ'}</button>
    </div>
    {tab === 'web' ? <CodeEditor elapsed={elapsed} reduced={reduced} /> : <EditingTimeline elapsed={elapsed} reduced={reduced} stage={stage} />}
  </aside>
}
