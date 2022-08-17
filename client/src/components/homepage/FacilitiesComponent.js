import React from 'react'
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap'
import { Fade } from 'react-reveal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBolt,
  faCarBattery,
  faGamepad,
  faRobot,
  faTools
} from '@fortawesome/free-solid-svg-icons'

const FacilitiesComponent = () => {
  const data = [
    {
      id: 1,
      text: 'ELECTRONICS AND IOT LAB',
      icon: faBolt
    },
    {
      id: 2,
      text: 'GAMING & ANIMATION DESIGN LAB',
      icon: faGamepad
    },
    {
      id: 3,
      text: 'POUCH BATTERY DESIGN LAB',
      icon: faCarBattery
    },
    {
      id: 4,
      text: 'ROBOTICS AND AUTOMATION LAB',
      icon: faRobot
    },
    {
      id: 5,
      text: 'MECHANICAL TOOLS & RAPID PROTOTYPING',
      icon: faTools
    }
  ]

  return (
    <Fade cascade>
      <Container className="h-100 fluid m-0" style={{ maxWidth: '100%' }}>
        <Row className="content">
          {data.map((item) => (
            <Col
              key={item.id}
              lg={2}
              md={4}
              sm={12}
              className="d-flex justify-center">
              <Link to="/facilities">
                <div className="facilities_card" key={item.id}>
                  <div className="icon">
                    <FontAwesomeIcon icon={item.icon} className="md-36" />
                  </div>
                  <p className="title">{item.text}</p>
                  <p className="text">Click for More..</p>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
        <Row>
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <div>
              <br />
              <h5 className="text-center">
                To avail the facilities of the NVCTI Labs visit{' '}
                <a href={'/register'}>the login page</a>
              </h5>
            </div>
          </div>
        </Row>
      </Container>
    </Fade>
  )
}
export default FacilitiesComponent
