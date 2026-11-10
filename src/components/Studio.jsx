import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Contact from './Contact/Contact'
import CreativeConsole from './CreativeConsole'
import Arrow from './shared/Arrow'
import './Studio.css'
import './StudioMotion.css'

const projects = [
  { title: 'Horizon Studio', description: 'Interactive visual journal', image: 'horizon-studio', url: 'https://demo-1-five-ebon.vercel.app/', category: 'Editorial' },
  { title: 'Paper Shaders', description: 'Interactive product website', image: 'paper-shaders', url: 'https://demo2-ruby-tau.vercel.app/', category: 'Product' },
  { title: 'VOIDHAUS', description: 'Fashion e-commerce experience', image: 'voidhaus', url: 'https://demo6-puce.vercel.app/', category: 'Commerce' },
  { title: 'AuthorityOS', description: 'Business landing page', image: 'authority-os', url: 'https://demo4-self.vercel.app/', category: 'Product' },
  { title: 'Alex Nova', description: 'Creative portfolio', image: 'alex-nova', url: 'https://demo5-lilac.vercel.app/', category: 'Editorial' },
  { title: 'Passage', description: 'Editorial travel journal', image: 'passage', url: 'https://demo3-kohl.vercel.app/', category: 'Editorial' },
]
const formats = [
  ['Talking', 'Talking videos', 'Hooks, clean pacing, and captions that keep your voice front and center.'],
  ['Product', 'Product showcases', 'Details, movement, and sound design that bring your product into focus.'],
  ['Tutorial', 'Tutorials', 'Clear steps, useful on-screen text, and a structure that is easy to follow.'],
  ['Lifestyle', 'Lifestyle', 'Thoughtful clip selection and a natural rhythm for everyday stories.'],
  ['Cooking', 'Cooking', 'A clear process, satisfying detail, and carefully timed cuts.'],
  ['Vlogs', 'Mini vlogs', 'The strongest moments, connected into a story worth staying for.'],
]
const webServices = [
  ['Web development', 'Modern, fast and scalable websites for creators and brands.'],
  ['Mobile applications', 'From ideas to functional mobile experiences.'],
  ['Online stores', 'E-commerce solutions that convert and scale.'],
  ['Interface design', 'Clean, intuitive interfaces that feel effortless.'],
  ['Search & visibility', 'Better visibility for long-term growth.'],
  ['Care & optimization', 'Ongoing support and performance improvements.'],
]

function Icon({ index = 0, web = false }) {
  const paths = [
    <><rect x="5" y="3" width="14" height="16" rx="3" /><path d="m10 8 5 3-5 3zM10 22h4" /></>,
    <><rect x="5" y="7" width="14" height="14" rx="2" /><path d="M9 7V5a3 3 0 0 1 6 0v2M10 12h4" /></>,
    <><circle cx="12" cy="12" r="9" /><path d="m10 8 5 4-5 4z" /></>,
    <><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3zM9 3v15M15 6v15" /></>,
    <><path d="M20 5c-4-4-8 1-8 1S8 1 4 5c-5 5 8 15 8 15S25 10 20 5Z" /></>,
    <><path d="m8 5 4-3 4 3h3l2 5-2 10H5L3 10l2-5z" /><circle cx="12" cy="12" r="2" /></>,
  ]
  const webPaths = [
    <><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M9 22h6M12 18v4m-2-13-3 3 3 3m4-6 3 3-3 3" /></>,
    <><rect x="6" y="2" width="12" height="20" rx="2" /><path d="M10 5h4M11 19h2" /></>,
    <><path d="M2 3h3l3 13h11l3-10H6" /><circle cx="9" cy="21" r="1" /><circle cx="18" cy="21" r="1" /></>,
    <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 8h18M9 8v13" /></>,
    <><circle cx="10" cy="10" r="7" /><path d="m15 15 7 7" /></>,
    <><path d="m12 2 8 4v6c0 5-8 10-8 10s-8-5-8-10V6zM8 12l3 3 5-6" /></>,
  ]
  return <svg className="service-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" aria-hidden="true">{(web ? webPaths : paths)[index % paths.length]}</svg>
}

function Header({ mode, onContact, onAbout }) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)
  useEffect(() => {
    if (!open) return
    const closeOnEscape = event => {
      if (event.key === 'Escape') {
        setOpen(false)
        menuRef.current.focus()
      }
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [open])
  return <header className="studio-nav wrap">
    <a className="wordmark" href="/" aria-label="Samy home">Samy<span>.</span></a>
    <button ref={menuRef} className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}><span aria-hidden="true">{open ? '×' : '☰'}</span></button>
    <nav id="main-nav" className={open ? 'is-open' : ''} aria-label="Main navigation">
      {[['home', '/', 'Home'], ['video', '/video-editing', 'Video editing'], ['web', '/web-development', 'Web development']].map(([key, url, title]) => <a key={key} href={url} aria-current={mode === key ? 'page' : undefined}>{title}</a>)}
      <button onClick={() => { setOpen(false); onAbout() }}>About</button>
    </nav>
    <button className="nav-contact" onClick={() => { setOpen(false); onContact() }}>{mode === 'home' ? 'Let’s talk' : 'Start a project'} <Arrow /></button>
  </header>
}

function HomeHero({ onContact }) {
  return <section className="home-hero wrap">
    <picture className="hero-photograph">
      <source media="(max-width: 800px)" srcSet="/visuals/studio-workspace-mobile.jpg" />
      <img src="/visuals/studio-workspace.jpg" alt="A warmly lit creative workspace with a video editing timeline on the monitor" width="1536" height="1024" fetchPriority="high" />
    </picture>
    <div className="hero-copy">
      <p className="mono eyebrow-copy">VIDEO EDITING & WEB DEVELOPMENT</p>
      <h1 className="home-title"><span>Ideas.</span><span className="text-peach">Edited.</span><span className="text-green">Built.</span><span>Brought to life.</span></h1>
      <p className="hero-description">Video editing and web development for creators and forward-thinking brands.</p>
      <div className="hero-actions"><a href="#explore" className="pill primary">Explore my work <Arrow /></a><button className="pill secondary" onClick={onContact}>Let’s talk</button></div>
    </div>
  </section>
}

function VideoHero({ onContact }) {
  return <section className="specialty-hero video-hero wrap"><figure className="specialty-photograph"><img src="/visuals/video-workspace.jpg" alt="Warm creative workspace with mountain footage on an editing monitor" width="1536" height="1024" fetchPriority="high" /><figcaption>Visual concept</figcaption></figure><div className="hero-copy"><p className="mono eyebrow-copy">SHORT-FORM VIDEO EDITOR<br />FOR CONTENT CREATORS</p><h1>You film.<br />I shape<br /><em>the story.</em></h1><p className="hero-description">I turn raw footage into polished Reels, TikToks and YouTube Shorts with strong pacing, clean cuts, captions, and an editing style that still feels like you.</p><div className="hero-actions"><button className="pill primary" onClick={onContact}>Get a free sample <Arrow /></button><a className="text-button" href="#breakdown">See how I edit</a></div></div></section>
}

function WebHero({ onContact }) {
  return <section className="specialty-hero web-hero wrap"><figure className="specialty-photograph"><img src="/visuals/web-workspace.jpg" alt="Laptop displaying Samy’s portfolio on a warmly lit desk" width="1536" height="1024" fetchPriority="high" /><figcaption className="mono">DESIGN / BUILD / CARE</figcaption></figure><div className="hero-copy"><p className="mono eyebrow-copy">WEB DEVELOPMENT<br />& DIGITAL SOLUTIONS</p><h1>Modern web<br />experiences.<br /><em>Made to matter.</em></h1><p className="hero-description">I design and develop websites, applications and digital products that bring thoughtful design and dependable development together.</p><div className="hero-actions"><a className="pill primary" href="#projects">View my work <Arrow /></a><button className="text-button" onClick={onContact}>Let’s talk</button></div></div></section>
}

function Stats({ home = false }) {
  const stats = [...(home ? [['317K+', 'Instagram community', 'Page management & content']] : []), ['5+', 'Years of experience', 'Since 2021'], ['100+', 'Projects worked on', 'Across our combined experience'], ['30+', 'Technologies', 'Across the full stack']]
  return <section className={`stats wrap ${home ? 'stats-home' : ''}`} aria-label="Experience">{stats.map(([value, title, detail]) => <div key={title}><strong>{value}</strong><span>{title}</span><small>{detail}</small></div>)}</section>
}

function Directions() {
  return <section id="explore" className="directions wrap" aria-label="Explore the portfolios">
    <a className="direction-card video-direction" href="/video-editing">
      <div className="direction-label mono"><span>01</span><h2>VIDEO EDITING</h2></div>
      <div className="direction-copy"><h3>Turn moments<br />into <em>impact.</em></h3><p>Thoughtful video editing for Reels, TikToks, YouTube Shorts, and more.</p><span className="direction-arrow" aria-label="View video editing"><Arrow /></span></div>
      <img className="direction-art editor-art" src="/visuals/mountain-editor.jpg" alt="Mountain footage in a video editing interface, visual concept" width="562" height="1000" loading="lazy" />
    </a>
    <a className="direction-card web-direction" href="/web-development">
      <div className="direction-label mono"><span>02</span><h2>WEB DEVELOPMENT</h2></div>
      <div className="direction-copy"><h3>Web experiences<br />that <em>work.</em></h3><p>Modern, fast, and thoughtful websites for creators and brands.</p><span className="direction-arrow" aria-label="View web development"><Arrow /></span></div>
      <img className="direction-art laptop-art" src="/visuals/portfolio-laptop.jpg" alt="Laptop displaying a portfolio website, visual concept" width="1000" height="1000" loading="lazy" />
    </a>
  </section>
}

function Process() {
  const steps = [
    ['Share the vision', 'Tell me about your goals and what you’re building.'],
    ['Create with purpose', 'I plan, edit, or develop with your audience in mind.'],
    ['Refine & deliver', 'We fine-tune the details and launch something great together.'],
  ]
  return <section className="process-section wrap" aria-labelledby="process-title">
    <div><p className="mono section-kicker">A SIMPLE PROCESS</p><h2 id="process-title">From first idea<br />to final delivery.</h2></div>
    <ol className="process-steps">{steps.map(([title, description], index) => <li key={title}><span className="step-number mono">0{index + 1}</span><h3>{title}</h3><p>{description}</p></li>)}</ol>
  </section>
}

function CraftDetails() {
  return <section className="craft-section wrap" aria-labelledby="craft-title">
    <h2 className="mono section-kicker" id="craft-title">THE DETAILS MAKE THE DIFFERENCE</h2>
    <div className="craft-layout">
      <div className="craft-visual"><CreativeConsole mode="home" /></div>
      <div className="craft-benefits">
        <article><span className="craft-icon"><Icon /></span><div><h3>Video that holds attention.</h3><p>Clean cuts, engaging pacing, and storytelling that keeps people watching.</p></div></article>
        <article><span className="craft-icon web-craft"><Icon web /></span><div><h3>Websites that feel effortless.</h3><p>Beautiful, fast, and easy to use. Digital experiences that help you stand out.</p></div></article>
      </div>
    </div>
  </section>
}

function HomeAbout({ onAbout }) {
  return <section id="about" className="home-about wrap" aria-labelledby="home-about-title">
    <div><p className="mono section-kicker">ABOUT SAMY</p><h2 id="home-about-title">Creative eye.<br />Developer mindset.</h2></div>
    <div><p>I’m Samy, a video editor and web developer based in Morocco. I work remotely with creators and brands to turn ideas into thoughtful digital experiences.</p><button className="text-button" onClick={onAbout}>More about me <Arrow /></button></div>
  </section>
}

function SiteFooter({ onAbout, onContact }) {
  return <footer className="studio-footer wrap"><a className="wordmark" href="/">Samy<span>.</span></a><nav aria-label="Footer navigation"><a href="/video-editing">Video Editing</a><a href="/web-development">Web Development</a><button onClick={onAbout}>About</button><button onClick={onContact}>Contact</button></nav><span className="footer-copyright">© {new Date().getFullYear()} Samy.</span></footer>
}

function ProjectGallery() {
  const [filter, setFilter] = useState('All')
  const [expanded, setExpanded] = useState(false)
  const filtered = projects.filter(p => filter === 'All' || p.category === filter)
  const visible = expanded || filter !== 'All' ? filtered : filtered.slice(0, 3)
  return <section id="projects" className="projects-section wrap"><div className="section-top"><h2>Selected projects.</h2><button className="text-button" onClick={() => { setExpanded(!expanded); setFilter('All') }} aria-expanded={expanded}>{expanded ? 'Show less' : 'View all six'} <Arrow /></button></div><div className="filters" aria-label="Filter projects">{['All', 'Editorial', 'Product', 'Commerce'].map(item => <button key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}</div><div className="studio-project-grid">{visible.map(project => <article className="studio-project" key={project.title}><a className="project-cover" href={project.url} target="_blank" rel="noreferrer"><img src={`/projects/${project.image}.webp`} alt={`${project.title} project preview`} loading="lazy" /></a><div className="project-caption"><h3>{project.title}</h3><p>{project.description}</p><a className="text-button" href={project.url} target="_blank" rel="noreferrer">View live site <Arrow /></a></div></article>)}</div></section>
}

function VideoSamples({ onContact }) {
  const [selected, setSelected] = useState('Talking')
  const format = formats.find(f => f[0] === selected)
  return <section className="samples-section wrap" id="work"><div className="section-top"><h2>Try a free edit.</h2><button className="text-button" onClick={onContact}>Get a free sample <Arrow /></button></div><div className="filters" aria-label="Editing sample categories">{formats.map(([key]) => <button key={key} aria-pressed={selected === key} onClick={() => setSelected(key)}>{key}</button>)}</div><div className="private-samples"><div className="sample-category" key={selected}><Icon index={formats.indexOf(format)} /><h3>{format[1]}</h3><p>{format[2]}</p></div><div className="private-samples-note"><span className="mono">YOUR FOOTAGE / A FREE SAMPLE</span><p>Send me your footage and I’ll edit a free sample. See how my style fits your content before deciding whether to work together.</p><button className="text-button" onClick={onContact}>Request a free sample <Arrow /></button></div></div></section>
}

function Breakdown() {
  const [stage, setStage] = useState('raw')
  const final = stage === 'final'
  return <section id="breakdown" className="breakdown-section wrap">
    <div className="section-top"><h2>From raw to ready.</h2><span className="mono">THE EDITING PROCESS</span></div>
    <div className="breakdown-layout">
      <div className="workflow-demo">
        <div className="workflow-toggle" aria-label="Editing workflow stage">
          <button aria-pressed={!final} onClick={() => setStage('raw')}>Raw footage</button>
          <button aria-pressed={final} onClick={() => setStage('final')}>Final edit <Arrow /></button>
        </div>
        <CreativeConsole mode="video" stage={stage} />
        <p className="demo-caption">{final ? 'Color, rhythm, and sound come together in a polished sequence.' : 'Review the footage. Find the strongest moments.'} <span>Workflow visual concept</span></p>
      </div>
      <div className="breakdown-copy">
        <h3>Everything you filmed.<br />Only what the story needs.</h3>
        <ul><li>Selected the strongest moments</li><li>Created a clear structure and hook</li><li>Added captions and sound design</li><li>Reviewed, refined, and exported</li></ul>
        <p>Send the footage → review the first cut → receive post-ready files.</p>
      </div>
    </div>
  </section>
}

function Services({ mode }) {
  const video = mode === 'video'
  const services = video ? formats.map(f => [f[1]]) : webServices
  const list = <div className={`service-row ${video ? 'video-service-grid' : 'web-service-grid'}`}>
    {services.map(([title, description], i) => <div key={title}><Icon index={i} web={!video} /><h3>{title}</h3>{description && <p>{description}</p>}</div>)}
  </div>
  return <section id="services" className="services-section wrap">
    <h2>{video ? 'Built for creator-led content.' : 'Services.'}</h2>
    {video ? list : <div className="web-services-layout"><CreativeConsole mode="web" />{list}</div>}
  </section>
}

function Closing({ mode, onContact }) {
  return <section className="closing wrap"><h2>{mode === 'home' ? <>Good ideas<br />make a better internet.</> : mode === 'web' ? <>Let’s build<br />something great.</> : <>Your next story.<br />Let’s make it happen.</>}</h2><p>{mode === 'home' ? 'Video editing. Web development. A thoughtful approach to both.' : mode === 'web' ? 'Have a project in mind? Let’s turn your ideas into a clear, useful digital experience.' : 'Share your footage and references. I’ll make a free editing sample so you can decide if you’d like to work together.'}</p><button className="pill primary" onClick={onContact}>{mode === 'video' ? 'Request a free sample' : 'Start a project'} <Arrow /></button></section>
}

export function StudioPage({ mode }) {
  const pageRef = useRef(null)
  const dialogRef = useRef(null)
  const aboutRef = useRef(null)
  const [contactMode, setContactMode] = useState(mode === 'web' ? 'web' : 'video')
  useLayoutEffect(() => {
    const page = pageRef.current
    if (!page || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const revealSelector = [
      '.directions .direction-card', '.process-section > div', '.process-steps li',
      '.craft-visual', '.craft-benefits article', '.home-about > div',
      '.stats > div', '.section-top', '.projects-section > .filters',
      '.samples-section > .filters', '.studio-project',
      '.private-samples', '.workflow-demo', '.breakdown-copy',
      '.services-section > h2', '.service-row > div', '.closing > *',
      '.web-services-layout > .creative-console',
    ].join(', ')
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.08, rootMargin: '0px 0px -35px 0px' })

    const observed = new WeakSet()
    const observeNew = () => {
      page.querySelectorAll(revealSelector).forEach(element => {
        if (observed.has(element) || element.classList.contains('is-visible')) return
        element.setAttribute('data-reveal', '')
        observed.add(element)
        observer.observe(element)
      })
    }
    observeNew()
    page.classList.add('motion-ready')
    const mutations = new MutationObserver(observeNew)
    const projectGrid = page.querySelector('.studio-project-grid')
    if (projectGrid) mutations.observe(projectGrid, { childList: true })
    return () => {
      mutations.disconnect()
      observer.disconnect()
      page.classList.remove('motion-ready')
    }
  }, [mode])
  const onContact = () => mode === 'home' ? document.getElementById('home-contact').scrollIntoView({ block: 'start' }) : dialogRef.current.showModal()
  const onAbout = () => aboutRef.current.showModal()
  return <div ref={pageRef} className={`studio studio-${mode}`} id="top">
    <a href="#main-content" className="skip-link">Skip to content</a>
    <Header mode={mode} onContact={onContact} onAbout={mode === 'home' ? () => document.getElementById('about').scrollIntoView({ block: 'start' }) : onAbout} />
    <main id="main-content">
      {mode === 'home' ? <><HomeHero onContact={onContact} /><CraftDetails /><Directions /><Process /><HomeAbout onAbout={onAbout} /><Contact compact /></> : mode === 'video' ? <><VideoHero onContact={onContact} /><VideoSamples onContact={onContact} /><Breakdown /><Services mode={mode} /></> : <><WebHero onContact={onContact} /><Stats /><ProjectGallery /><Services mode={mode} /></>}
      {mode !== 'home' && <Closing mode={mode} onContact={onContact} />}
    </main>
    <SiteFooter onAbout={onAbout} onContact={onContact} />
    {mode !== 'home' && <dialog className="contact-dialog" aria-label="Start a project" ref={dialogRef} onClick={e => { if (e.target === e.currentTarget) dialogRef.current.close() }}>
      <button className="dialog-close" onClick={() => dialogRef.current.close()} aria-label="Close contact form">Close ×</button>
      <div className="contact-mode filters" aria-label="Project discipline"><button aria-pressed={contactMode === 'video'} onClick={() => setContactMode('video')}>Video editing</button><button aria-pressed={contactMode === 'web'} onClick={() => setContactMode('web')}>Web development</button></div>
      <Contact key={contactMode} mode={contactMode} />
    </dialog>}
    <dialog className="about-dialog" aria-labelledby="about-title" ref={aboutRef} onClick={e => { if (e.target === e.currentTarget) aboutRef.current.close() }}>
      <button className="dialog-close" onClick={() => aboutRef.current.close()}>Close ×</button><span className="mono">ABOUT SAMY</span><h2 id="about-title">A creative eye.<br />A technical foundation.</h2><p>I’m a short-form video editor and web developer. My graphic-design background informs the typography, composition, and detail in my work. My software-engineering background keeps the process organized and dependable.</p><dl><div><dt>Late 2025 to present</dt><dd>Video editing for content creators</dd></div><div><dt>2022 to 2027</dt><dd>Software engineering studies</dd></div></dl><a className="text-button" href="mailto:hello@sami-creative.com">Get in touch <Arrow /></a>
    </dialog>
  </div>
}
