import React, { Fragment, lazy, Suspense } from 'react';
import Loading from '../components/common/Loading';
const NavbarComponent = lazy(() => import('../components/common/navbar'))
const Footer = lazy(() => import('../components/common/footer'))
const SingleEventCover = lazy(() => import('../components/events-page/single-event-cover'))
const OtherInfo = lazy(() => import('../components/events-page/other-events/info'))

const OtherEvents = () => {
  React.useEffect(() => {
    const func = () => {
      document.title = 'Other Events | NVCTI';
    };
    func();
  }, []);
  return (
    <Fragment>
      <Suspense fallback={<Loading/>}>
      <NavbarComponent variant='transparent'/>
        <SingleEventCover keyword='other' title='Other Events' />
        <OtherInfo />
        <Footer extraStyle={{ marginTop: '0' }} />
      </Suspense>
    </Fragment>
  );
};

export default OtherEvents;
