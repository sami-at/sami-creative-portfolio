import Arrow from '../shared/Arrow'
import './Hero.css'

export default function Hero() {
  return <section id="home" className="hero page-width" aria-labelledby="hero-title">
    <div className="hero-copy">
      <span className="eyebrow hero-label"><span /> Short-form video editor for content creators</span>
      <h1 id="hero-title">You film.<br /><em>I shape the story.</em></h1>
      <p>I turn raw footage into polished Instagram Reels, TikToks, and YouTube Shorts with thoughtful clip selection, strong pacing, clean cuts, captions, and an editing style that still feels like you.</p>
      <div className="hero-actions">
        <a className="primary-button" href="#contact">Request a free sample <Arrow /></a>
        <a className="secondary-link" href="#breakdown">See how I edit <span aria-hidden="true">↓</span></a>
      </div>
      <div className="hero-meta eyebrow"><span>Instagram Reels</span><span>TikTok</span><span>YouTube Shorts</span></div>
    </div>
    <div className="hero-visual" aria-label="Short-form editing workflow preview">
      <div className="visual-header eyebrow"><span>Raw footage → post-ready edit</span><span>9:16</span></div>
      <div className="reel-stage">
        <div className="reel-frame reel-back"><span>PRODUCT</span></div>
        <div className="reel-frame reel-middle"><span>LIFESTYLE</span></div>
        <div className="reel-frame reel-front">
          <div className="frame-top eyebrow">CREATOR CONTENT / 00:34</div>
          <div className="frame-center"><span className="frame-hook">The right<br /><em>moment.</em></span><span className="frame-format" aria-hidden="true">9:16</span></div>
          <div className="frame-caption">Strong hook. Clean pacing.<br />Ready to post.</div>
        </div>
      </div>
      <div className="visual-timeline" aria-hidden="true"><span /><span /><span /><span /><span /><span /></div>
      <div className="visual-footer eyebrow"><span>Review / Select / Structure / Finish</span><span>SC-01</span></div>
    </div>
  </section>
}
