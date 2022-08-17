import React, { Component, Fragment, lazy, Suspense } from 'react';
import Loading from '../components/common/Loading';
const Footer = lazy(() => import('../components/common/footer'))
const NavbarComponent = lazy(() => import('../components/common/navbar'))
const MainContent = lazy(() => import('../components/register/content'))
const RegisterCover = lazy(() => import('../components/register/cover'))
const RegisterInfo = lazy(() => import('../components/register/info'))

class Register extends Component {
  componentDidMount() {
    document.title = 'Register | NVCTI';
  }

  render() {
    return (
      <Fragment>
        <Suspense fallback={<Loading/>}>
          <NavbarComponent variant='transparent'/>
          <RegisterCover />
          <RegisterInfo />
          <MainContent/>
          <Footer extraStyle={{marginTop:'0'}}/>
        </Suspense>
      </Fragment>
    );
  }
}

export default Register;
