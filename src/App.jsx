import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import { ScrollProgress, Cursor, PageLoader, BackToTop } from './components/Effects'

// Below-the-fold sections are code-split so the first screen loads fast.
const About = lazy(() => import('./components/About'))
const Skills = lazy(() => import('./components/Skills'))
const Projects = lazy(() => import('./components/Projects'))
const MoreWork = lazy(() => import('./components/MoreWork'))
const Experience = lazy(() => import('./components/Experience'))
const Deployment = lazy(() => import('./components/Deployment'))
const Education = lazy(() => import('./components/Education'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))

export default function App() {
  return (
    <div className="noise relative">
      <PageLoader />
      <ScrollProgress />
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
          <About />
          <Skills />
          <Projects />
          <MoreWork />
          <Experience />
          <Deployment />
          <Education />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <BackToTop />
    </div>
  )
}
