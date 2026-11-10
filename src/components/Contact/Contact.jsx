import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import Arrow from '../shared/Arrow'
import './Contact.css'

const emailjsConfig = {
  serviceId: 'service_cp8zkth',
  templateId: 'template_phhpi8t',
  publicKey: '6w5JlL2NKi2SZdtZf',
}

const lastSubmissionKey = 'samy-contact-last-submission'
const submissionCooldownMs = 120_000

function wasRecentlySubmitted() {
  try {
    const elapsed = Date.now() - Number(window.localStorage.getItem(lastSubmissionKey) || 0)
    return elapsed >= 0 && elapsed < submissionCooldownMs
  } catch {
    return false
  }
}

function rememberSubmission() {
  try {
    window.localStorage.setItem(lastSubmissionKey, String(Date.now()))
  } catch {
    // The form still works when browser storage is unavailable.
  }
}

const contactContent = {
  video: {
    eyebrow: '04 / Start a project',
    title: <>Try a free sample<br /><em>with your footage.</em></>,
    intro: 'Tell me about your content and request a free editing sample to see if we’re a good fit.',
    direct: 'Prefer email? Write to me directly and include a link to your content.',
    helpful: 'Your profile, the kind of videos you make, expected monthly volume, and a reference for the editing style you like.',
    profileLabel: 'Creator or social profile',
    profilePlaceholder: 'https://instagram.com/…',
    volumeLabel: 'Monthly video volume',
    volumeOptions: ['1–4 videos', '5–8 videos', '9–15 videos', '16+ videos', 'Not sure yet'],
    timelineOptions: ['Within a week', 'Within two weeks', 'Ongoing collaboration', 'Flexible / not sure yet'],
    referenceLabel: 'Editing style reference',
    referencePlaceholder: 'Link to a Reel, TikTok, or YouTube video',
    messageLabel: 'What do you need help editing?',
    messagePlaceholder: 'Tell me about your content, timeline, and the kind of support you need…',
    faqs: [['Can you match my current style?', 'Yes. References and previous posts help me keep your content recognizable.'], ['Do you edit ongoing batches?', 'Yes. One-off edits and recurring creator partnerships are both welcome.'], ['How does pricing work?', 'Quotes reflect footage volume, editing complexity, turnaround, and monthly output.'], ['Do you offer a free sample?', 'Yes. I offer a free editing sample so you can see how my style fits your content before deciding whether to start working together.']],
  },
  web: {
    eyebrow: '04 / Start a project',
    title: <>Have something useful<br /><em>to build?</em></>,
    intro: 'Tell me what you are creating, where the project stands, and what kind of development support you need.',
    direct: 'Prefer email? Write to me directly and include any useful links, references, or project documents.',
    helpful: 'Your project goal, current stage, required features, preferred timeline, and any existing brand or technical material.',
    profileLabel: 'Company or project URL',
    profilePlaceholder: 'https://yourproject.com',
    volumeLabel: 'Project type',
    volumeOptions: ['Website', 'Web application', 'Mobile application', 'E-commerce', 'Interface design', 'Care & optimization', 'Not sure yet'],
    timelineOptions: ['Within a month', '1–3 months', '3+ months', 'Flexible / not sure yet'],
    referenceLabel: 'Website or design inspiration',
    referencePlaceholder: 'Link to a website or design you like',
    messageLabel: 'What are you looking to build?',
    messagePlaceholder: 'Tell me about the project, its goals, timeline, and the support you need…',
    faqs: [['Can you work from an existing design?', 'Yes. I can build from supplied designs or help shape the interface before development.'], ['Do you take complete projects?', 'Yes. Projects can cover the full experience from interface planning through development and delivery.'], ['How does pricing work?', 'Quotes reflect scope, functionality, technical complexity, and timeline.'], ['Can you improve an existing product?', 'Yes. Care and optimization work can focus on usability, performance, maintenance, and focused improvements.']],
  },
}

export default function Contact({ mode = 'video', compact = false }) {
  const [inquiryMode, setInquiryMode] = useState(mode)
  const activeMode = compact ? inquiryMode : mode
  const content = contactContent[activeMode]
  const [formData, setFormData] = useState({ name: '', email: '', profile: '', volume: '', message: '' })
  const [briefs, setBriefs] = useState({
    video: { profile: '', volume: '', timeline: '', reference: '' },
    web: { profile: '', volume: '', timeline: '', reference: '' },
  })
  const details = compact ? briefs[activeMode] : formData
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formMessage, setFormMessage] = useState({ type: '', text: '' })
  const sending = useRef(false)
  const spamTrap = useRef(null)
  const handleChange = event => {
    const { name, value } = event.target
    if (compact && ['profile', 'volume', 'timeline', 'reference'].includes(name)) {
      setBriefs(previous => ({ ...previous, [activeMode]: { ...previous[activeMode], [name]: value } }))
    } else {
      setFormData(previous => ({ ...previous, [name]: value }))
    }
  }
  const handleSubmit = async event => {
    event.preventDefault()
    if (sending.current) return
    if (spamTrap.current?.value) {
      spamTrap.current.value = ''
      setFormMessage({ type: 'error', text: 'Please try submitting again.' })
      return
    }
    if ([formData.name, formData.email, formData.message].some(value => !value.trim())) {
      setFormMessage({ type: 'error', text: 'Please complete each field before sending.' })
      return
    }
    if (wasRecentlySubmitted()) {
      setFormMessage({ type: 'error', text: 'Please wait two minutes before sending another message.' })
      return
    }
    sending.current = true
    setIsSubmitting(true)
    setFormMessage({ type: '', text: '' })
    try {
      const now = new Date()
      const projectMessage = [
        formData.message.trim(),
        compact && details.timeline && `Preferred timeline: ${details.timeline}`,
        compact && details.reference.trim() && `${content.referenceLabel}: ${details.reference.trim()}`,
      ].filter(Boolean).join('\n\n')
      await emailjs.send(emailjsConfig.serviceId, emailjsConfig.templateId, {
        name: formData.name.trim(), email: formData.email.trim(),
        portfolio: activeMode === 'web' ? 'Web development' : 'Video editing',
        profile_label: content.profileLabel,
        profile: details.profile.trim() || 'Not provided',
        volume_label: content.volumeLabel,
        volume: details.volume || 'Not provided',
        project_message: projectMessage,
        message: [projectMessage, `Portfolio: ${activeMode}`, details.profile && `${content.profileLabel}: ${details.profile.trim()}`, details.volume && `${content.volumeLabel}: ${details.volume}`].filter(Boolean).join('\n\n'),
        date: now.toLocaleDateString(), time: now.toLocaleTimeString(),
      }, { publicKey: emailjsConfig.publicKey, blockHeadless: true })
      rememberSubmission()
      setFormData({ name: '', email: '', profile: '', volume: '', message: '' })
      if (compact) setBriefs(previous => ({ ...previous, [activeMode]: { profile: '', volume: '', timeline: '', reference: '' } }))
      setFormMessage({ type: 'success', text: 'Message sent. Thanks for getting in touch!' })
    } catch {
      setFormMessage({ type: 'error', text: 'Your message couldn’t be sent. Please try again or email me directly.' })
    } finally {
      sending.current = false
      setIsSubmitting(false)
    }
  }
  if (compact) return <section id="home-contact" className="home-inquiry wrap" aria-labelledby="inquiry-title">
    <div className="inquiry-heading"><p className="mono section-kicker">LET’S WORK TOGETHER</p><h2 id="inquiry-title">Let’s bring your<br />next idea to life.</h2><svg className="inquiry-underline" viewBox="0 0 250 24" fill="none" aria-hidden="true"><path d="M3 21C64 6 118 1 190 8M13 19C105 4 173 5 245 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg><a className="inquiry-email" href="mailto:hello@sami-creative.com">hello@sami-creative.com</a></div>
    <form className="inquiry-form" onSubmit={handleSubmit} aria-busy={isSubmitting}>
      <fieldset className="inquiry-discipline"><legend>I’m interested in</legend>{[['video', 'Video editing'], ['web', 'Web development']].map(([value, label]) => <label key={value}><input type="radio" name="discipline" value={value} checked={inquiryMode === value} onChange={() => setInquiryMode(value)} disabled={isSubmitting} /><span>{label}</span></label>)}</fieldset>
      <p className="inquiry-intro">{content.intro} Only your name, email, and project details are required.</p>
      <div className="form-honeypot" aria-hidden="true"><label htmlFor="inquiry-website">Website</label><input id="inquiry-website" name="website" type="text" tabIndex="-1" autoComplete="off" ref={spamTrap} /></div>
      <div className="inquiry-top-row">
        <div className="inquiry-field"><label htmlFor="inquiry-name">Your name <span>*</span></label><input id="inquiry-name" name="name" autoComplete="name" placeholder="Your name" value={formData.name} onChange={handleChange} required disabled={isSubmitting} maxLength={120} /></div>
        <div className="inquiry-field"><label htmlFor="inquiry-email">Your email <span>*</span></label><input id="inquiry-email" name="email" type="email" autoComplete="email" placeholder="you@email.com" value={formData.email} onChange={handleChange} required disabled={isSubmitting} maxLength={254} /></div>
      </div>
      <div className="inquiry-top-row">
        <div className="inquiry-field"><label htmlFor="inquiry-profile">{content.profileLabel} <small>(optional)</small></label><input id="inquiry-profile" name="profile" type="url" autoComplete="url" placeholder={content.profilePlaceholder} value={details.profile} onChange={handleChange} disabled={isSubmitting} maxLength={500} /></div>
        <div className="inquiry-field"><label htmlFor="inquiry-volume">{content.volumeLabel} <small>(optional)</small></label><select id="inquiry-volume" name="volume" value={details.volume} onChange={handleChange} disabled={isSubmitting}><option value="">Select an option</option>{content.volumeOptions.map(option => <option key={option}>{option}</option>)}</select></div>
      </div>
      <div className="inquiry-top-row">
        <div className="inquiry-field"><label htmlFor="inquiry-timeline">Preferred timeline <small>(optional)</small></label><select id="inquiry-timeline" name="timeline" value={details.timeline} onChange={handleChange} disabled={isSubmitting}><option value="">Select a timeline</option>{content.timelineOptions.map(option => <option key={option}>{option}</option>)}</select></div>
        <div className="inquiry-field"><label htmlFor="inquiry-reference">{content.referenceLabel} <small>(optional)</small></label><input id="inquiry-reference" name="reference" type="url" placeholder="https://…" aria-describedby="inquiry-reference-hint" value={details.reference} onChange={handleChange} disabled={isSubmitting} maxLength={500} /><small id="inquiry-reference-hint" className="inquiry-hint">{content.referencePlaceholder}</small></div>
      </div>
      <div className="inquiry-field"><label htmlFor="inquiry-message">{content.messageLabel} <span>*</span></label><textarea id="inquiry-message" name="message" placeholder={activeMode === 'video' ? 'What kind of content do you make? Include your platforms, typical video length, available footage, and the editing support you need…' : 'What is the project for? Include your goals, key features, current progress, and any design or technical requirements…'} rows="5" value={formData.message} onChange={handleChange} required disabled={isSubmitting} maxLength={5000} /></div>
      <button className="pill primary inquiry-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Sending…' : 'Send inquiry'} <Arrow /></button>
      <p className={`form-message ${formMessage.type}`} role="status" aria-live="polite">{formMessage.text}</p>
    </form>
  </section>

  return <section id="contact" className="contact" aria-labelledby="contact-title"><div className="page-width">
    <div className="contact-heading"><span className="eyebrow">{content.eyebrow}</span><h2 id="contact-title">{content.title}</h2><p>{content.intro}</p></div>
    <div className="contact-content"><div className="contact-info"><span className="eyebrow">Direct contact</span><p>{content.direct}</p><a href="mailto:hello@sami-creative.com" className="contact-email">hello@sami-creative.com <Arrow /></a><div className="contact-promise"><span className="eyebrow">Good to include</span><p>{content.helpful}</p></div></div>
      <form className="contact-form" onSubmit={handleSubmit} aria-busy={isSubmitting}>
        <div className="form-honeypot" aria-hidden="true"><label htmlFor="contact-website">Website</label><input id="contact-website" name="website" type="text" tabIndex="-1" autoComplete="off" ref={spamTrap} /></div>
        <div className="form-top-row"><div className="form-field"><label htmlFor="name">Your name <span>*</span></label><input id="name" name="name" autoComplete="name" placeholder="Your name" value={formData.name} onChange={handleChange} required disabled={isSubmitting} maxLength={120} /></div><div className="form-field"><label htmlFor="email">Your email <span>*</span></label><input id="email" type="email" name="email" autoComplete="email" placeholder="you@email.com" value={formData.email} onChange={handleChange} required disabled={isSubmitting} maxLength={254} /></div></div>
        <div className="form-top-row"><div className="form-field"><label htmlFor="profile">{content.profileLabel}</label><input id="profile" name="profile" type="url" autoComplete="url" placeholder={content.profilePlaceholder} value={formData.profile} onChange={handleChange} disabled={isSubmitting} maxLength={500} /></div><div className="form-field"><label htmlFor="volume">{content.volumeLabel}</label><select id="volume" name="volume" value={formData.volume} onChange={handleChange} disabled={isSubmitting}><option value="">Select an option</option>{content.volumeOptions.map(option => <option key={option}>{option}</option>)}</select></div></div>
        <div className="form-field"><label htmlFor="message">{content.messageLabel} <span>*</span></label><textarea id="message" name="message" placeholder={content.messagePlaceholder} rows="4" value={formData.message} onChange={handleChange} required disabled={isSubmitting} maxLength={5000} /></div>
        <div className="form-bottom"><span className="eyebrow">No obligation. Just a useful first conversation.</span><button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Sending…' : 'Start the conversation'}<Arrow /></button></div>
        <p className={`form-message ${formMessage.type}`} role="status" aria-live="polite">{formMessage.text}</p>
      </form>
    </div>
    <div className="quick-faq"><span className="eyebrow">Quick answers</span><div>{content.faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></div>
  </div></section>
}
