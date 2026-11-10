import Arrow from '../shared/Arrow'
import './Footer.css'
export default function Footer({ mode = 'video' }) {
  const isVideo = mode === 'video'
  const links = isVideo ? [['work', 'Work'], ['services', 'Services'], ['process', 'Process']] : [['projects', 'Work'], ['dev-services', 'Services'], ['dev-experience', 'Experience']]
  return <footer className="site-footer page-width"><div className="footer-main"><a className="footer-wordmark" href="/" aria-label="Samy, choose a portfolio">SAMY</a><p>{isVideo ? <>Short-form video editor<br />for content creators.</> : <>Web developer<br />& software engineer.</>}</p><nav aria-label="Footer navigation">{links.map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}<a href="#contact">Contact</a></nav><a href="#home" className="back-to-top">Back to top <Arrow /></a></div><div className="footer-bottom eyebrow"><span>© {new Date().getFullYear()} Samy</span><a href="mailto:hello@sami-creative.com">hello@sami-creative.com</a><a href={isVideo ? '/web-development' : '/video-editing'}>{isVideo ? 'Web Development' : 'Video Editing'} →</a></div></footer>
}
