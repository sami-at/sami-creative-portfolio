import { useEffect, useRef, useState } from 'react'
import Arrow from '../shared/Arrow'
import './Navbar.css'
const navSets = {
  video: [['work', 'Work'], ['services', 'Services'], ['process', 'Process'], ['contact', 'Contact']],
  web: [['projects', 'Work'], ['dev-services', 'Services'], ['dev-experience', 'Experience'], ['contact', 'Contact']],
}

export default function Navbar({ mode = 'video' }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const menuButton = useRef(null)
  const links = navSets[mode]
  const isVideo = mode === 'video'
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id) })
    }, { rootMargin: '-15% 0px -65% 0px' })
    document.querySelectorAll('main section[id]').forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [])
  useEffect(() => {
    if (!open) return
    const close = event => {
      if (event.key === 'Escape') { setOpen(false); menuButton.current?.focus() }
    }
    const query = window.matchMedia('(min-width: 761px)')
    const resize = () => { if (query.matches) setOpen(false) }
    document.addEventListener('keydown', close)
    query.addEventListener('change', resize)
    return () => { document.removeEventListener('keydown', close); query.removeEventListener('change', resize) }
  }, [open])
  return <header className="site-header">
    <div className="nav-content page-width">
      <a href="/" className="wordmark" aria-label="Samy, choose a portfolio" onClick={() => setOpen(false)}>SAMY<span className="brand-caption">{isVideo ? <>SHORT-FORM<br />VIDEO EDITOR</> : <>WEB DEVELOPER<br />SOFTWARE ENGINEER</>}</span></a>
      <nav className="desktop-nav" aria-label="Main navigation">{links.map(([id, label]) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined}>{label}<span className="nav-dot" /></a>)}</nav>
      <a className="portfolio-switch" href={isVideo ? '/web-development' : '/video-editing'}>{isVideo ? 'Web Development' : 'Video Editing'}</a>
      <a className="nav-contact" href="#contact">Start a project <Arrow /></a>
      <button className="menu-toggle" ref={menuButton} onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-navigation">{open ? 'Close' : 'Menu'} <span aria-hidden="true">{open ? '−' : '+'}</span></button>
    </div>
    <nav id="mobile-navigation" className="mobile-navigation" aria-label="Mobile navigation" hidden={!open}>{links.map(([id, label], i) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}><span className="eyebrow">0{i + 1}</span>{label}<Arrow /></a>)}<a className="mobile-switch" href={isVideo ? '/web-development' : '/video-editing'}><span className="eyebrow">Switch portfolio</span>{isVideo ? 'Web Development' : 'Video Editing'}<Arrow /></a></nav>
  </header>
}
