import React, { Fragment, lazy, Suspense, useEffect } from 'react';
import Loading from '../components/common/Loading';
const Footer = lazy(() => import('../components/common/footer'));
const NavbarComponent = lazy(() => import('../components/common/navbar'));
const SingleEventCover = lazy(() => import('../components/events-page/single-event-cover'));
const UpcomingInfo = lazy(() => import('../components/events-page/upcoming-events/info'));

const UpcomingEvents = () => {
  useEffect(() => {
    const func = () => {
      document.title = 'Upcoming Events | NVCTI';
    };
    func();
  }, []);
    return (
      <Fragment>
        <Suspense fallback={<Loading/>}>
          <NavbarComponent variant='transparent'/>
          <SingleEventCover keyword='upcoming' title='Upcoming Events' />
          <UpcomingInfo />
          <Footer extraStyle={{ marginTop: '0' }} />
        </Suspense>
      </Fragment>
    );
}

export default UpcomingEvents
