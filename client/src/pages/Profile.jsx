import React, { Fragment, lazy, Suspense, useEffect } from 'react';
import Loading from '../components/common/Loading';
const ProfileHeader = lazy(() => import('../components/Profile/profileHeader'))
const ProfileMain = lazy(() => import('../components/Profile/profileMain'))
const Footer = lazy(() => import('../components/common/footer'))

const Profile = () => {
  useEffect(() => {
    const func = () => {
      document.title = 'Profile | NVCTI';
    };
    func();
  }, []);
  return (
    <Fragment>
      <Suspense fallback={<Loading/>}>
        <ProfileHeader />
        <ProfileMain />
        <Footer extraStyle={{ marginTop: '100px' }} />
      </Suspense>
    </Fragment>
  );
}

export default Profile
