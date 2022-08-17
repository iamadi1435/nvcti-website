import React, { Fragment, lazy, Suspense } from 'react';
import Loading from '../components/common/Loading';
const NavbarComponent = lazy(() => import('../components/common/navbar'))
const Footer = lazy(() => import('../components/common/footer'))
const SingleEventCover = lazy(() => import('../components/events-page/single-event-cover'))
const MicInfo = lazy(() => import('../components/events-page/mic-events/info'))

const MicEvents = () => {
  React.useEffect(() => {
    const func = () => {
      document.title = 'MIC Events | NVCTI';
    };
    func();
  }, []);
  return (
    <Fragment>
      <Suspense fallback={<Loading/>}>
        <NavbarComponent variant='transparent'/>
        <SingleEventCover keyword='mic' title='MIC Events' />
        <MicInfo />
        <Footer extraStyle={{ marginTop: '0' }} />
      </Suspense>
    </Fragment>
  );
};

export default MicEvents;
