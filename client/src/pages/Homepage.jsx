import React, { lazy, Suspense, useEffect } from 'react'
import Loading from '../components/common/Loading'
import FacilitiesComponent from '../components/homepage/FacilitiesComponent'
import UpcomingEvents from '../components/homepage/UpcomingEvents'

const NavbarComponent = lazy(() => import('../components/common/navbar'))
const Footer = lazy(() => import('../components/common/footer'))
const Cover = lazy(() => import('../components/homepage/cover'))
const Video = lazy(() => import('../components/common/Video'))
const Announcements = lazy(() => import('../components/homepage/announcements'))
const Sponsor = lazy(() => import('../components/homepage/sponsor'))
const WordSection = lazy(() => import('../components/homepage/wordSection'))
const BrochureDownload = lazy(() => import('../components/homepage/BrochureDownload'))

const Homepage = () => {
  useEffect(() => {
    const func = () => {
      document.title = 'Home | NVCTI'
    }
    func()
  }, [])
  return (
    <Suspense fallback={<Loading/>}>
      <NavbarComponent variant="transparent"/>
      <Cover/>
      <WordSection/>
      <FacilitiesComponent/>
      <Sponsor/>
      <Announcements/>
      <UpcomingEvents/>
      <Video/>
      <br/>
      <BrochureDownload/>
      <Footer/>
    </Suspense>
  )
}

export default Homepage
