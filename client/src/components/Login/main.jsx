import React, { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import { Fade } from "react-reveal";
import Loader from "../common/loader";
const IITISMLogin = lazy(() => import('./iitismlogin'));
const OtherLogin = lazy(() => import('./otherlogin'));

const TextComponent = () => {
  return (
    <div className="welcome-text justify-align-center" style={{flexDirection:"column"}}>
      <Fade>
        <h2>Welcome Back! </h2>
        <p className="pt-2">
          To manage your applications, login with your personal info.
        </p>
        <p className="pb-3">Haven't registered yet? Click here</p>
        <Link to="/register" className="custom-button">
          Register
        </Link>
      </Fade>
    </div>
  );
};

const Main = () => {
  return (
    <div className="justify-center login-main-div">
      <Fade cascade>
        <div className="cover">
          <Suspense
            fallback={
              <div
                style={{ margin: '100px 0' }}
                className="justify-align-center">
                <Loader
                  extraStyle={{
                    height: '2rem',
                    width: '2rem',
                    borderWidth: '0.3rem'
                  }}
                />
              </div>
            }>
            <Container
              style={{
                background: '#f2f2f2',
                maxWidth: '100vw',
                height: '100%'
              }}>
              <Row>
                <Col
                  md={4}
                  sm={12}
                  lg={5}
                  className="left-side justify-align-center">
                  <TextComponent />
                </Col>
                <Col
                  md={8}
                  sm={12}
                  lg={7}
                  className="right-side justify-align-center">
                  <IITISMLogin />
                  <hr
                    className="login-hr"
                    style={{
                      width: '100%',
                      padding: 0,
                      margin: 0
                    }}
                  />
                  <OtherLogin />
                </Col>
              </Row>
            </Container>
          </Suspense>
        </div>
      </Fade>
    </div>
  )
};

export default Main;
