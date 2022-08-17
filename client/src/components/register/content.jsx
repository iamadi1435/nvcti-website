import React, { useState } from 'react'
import { Col, Row, Button } from 'react-bootstrap'
import { Fade } from 'react-reveal'
import PopUpForm from './PopUpForm'
import PopUpLogin from './PopUpLogin'

const LeftSide = () => {
  const [modalShow, setModalShow] = useState(false)
  const [loginShow, setLoginShow] = useState(false)
  return (
    <div className="outer-div">
      <Fade left cascade>
        <div className="section-title center-xs">
          <h3 className="header">Internal Applicants</h3>

          <p className="fw500">
            Students from IIT (ISM)
            Dhanbad
          </p>
          {/*<br/>*/}
          <Button
            variant="dark"
            className="mb-2"
            onClick={() => setLoginShow(true)}>
            <strong>Log In</strong>
          </Button>
          <Button
            variant="dark"
            onClick={() => setModalShow(true)}
            style={{
              margin: '5px 0px'
            }}>
            <strong>Register</strong>
          </Button>
          <PopUpLogin
            show={loginShow}
            onHide={() => setLoginShow(false)}
            rightAnimation={false}
            leftAnimation={false}
            formToggle="IITISM"
          />
          <PopUpForm
            show={modalShow}
            onHide={() => setModalShow(false)}
            rightAnimation={true}
            leftAnimation={false}
            formToggle="IITISM"
          />
        </div>
      </Fade>
    </div>
  )
}

const RightSide = () => {
  const [modalShow, setModalShow] = useState(false)
  const [loginShow, setLoginShow] = useState(false)
  return (
    <div className="outer-div dark" style={{ height: '100%' }}>
      <Fade right cascade>
        <div className="section-title center-xs">
          <h3 className="header">External Applicants</h3>
          <p className="fw500">Students from all the other colleges</p>
          <Button
            variant="light"
            className="mb-2"
            onClick={() => setLoginShow(true)}>
            <strong>Log In</strong>
          </Button>
          <Button
            variant="light"
            onClick={() => setModalShow(true)}
            style={{
              margin: '5px 0px'
            }}>
            <strong>Register</strong>
          </Button>
          <PopUpLogin
            show={loginShow}
            onHide={() => setLoginShow(false)}
            rightAnimation={false}
            leftAnimation={false}
            formToggle="OTHERS"
          />
          <PopUpForm
            show={modalShow}
            onHide={() => setModalShow(false)}
            rightAnimation={false}
            leftAnimation={true}
            formToggle="OTHERS"
          />
        </div>
      </Fade>
    </div>
  )
}

const MainContent = () => {
  return (
    <section className="page-section grey-section">
      <Row>
        <Col sm={12} xs={12} md={6} lg={6}>
          <LeftSide />
        </Col>
        <Col sm={12} xs={12} md={6} lg={6}>
          <RightSide />
        </Col>
      </Row>
    </section>
  )
}

export default MainContent
