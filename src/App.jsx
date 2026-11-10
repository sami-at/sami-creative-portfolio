import './App.css'
import { useEffect } from 'react'
import EntryPage from './pages/EntryPage'
import VideoEditingPage from './pages/VideoEditingPage'
import WebDevelopmentPage from './pages/WebDevelopmentPage'

const routes = {
  '/video-editing': {
    title: 'Samy | Short-Form Video Editor',
    description: 'Short-form video editing for content creators across Instagram Reels, TikTok, and YouTube Shorts.',
    component: VideoEditingPage,
  },
  '/web-development': {
    title: 'Samy | Web Developer & Software Engineer',
    description: 'Websites, applications, interfaces, and digital products designed and developed by Samy.',
    component: WebDevelopmentPage,
  },
}

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  const route = routes[path]
  const Page = route?.component || EntryPage

  useEffect(() => {
    const title = route?.title || 'Samy | Video Editing & Web Development'
    const description = route?.description || 'Choose between Samy’s video-editing and web-development portfolios.'
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#0d0f0d')
  }, [route, path])

  return <Page />
}
