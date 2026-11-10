export default function Arrow({ down = false }) {
  return <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d={down ? 'M12 3v17M5 13l7 7 7-7' : 'M5 19 19 5M5 5h14v14'} /></svg>
}
