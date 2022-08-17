import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Fade } from 'react-reveal'

const EventInfo = () => {
  return (
    <>
      <section className="events">
        <Container>
          <Row style={{ justifyContent: 'center' }}>
            <Fade>
              <Col md={12} sm={12} lg={12}>
                <h1 className="heading">
                  <span>What events do we </span>host?
                  <span role="img" aria-label="bulb-icon">
                    💡
                  </span>
                </h1>
              </Col>
            </Fade>
            <Col md={12} sm={12} lg={12}>
              <Fade cascade>
                <div>
                  <p className="text mt-4" style={{ textAlign: 'justify' }}>
                    <strong>NVCTI</strong> hosts a wide variety of events to
                    cultivate young fertile brains as the innovators and
                    entrepreneurs of the future. The centre organises these
                    events either individually or in association with government
                    or private establishments. The organisation of the events is
                    undertaken by the faculty and student members of the
                    Institute Innovation Cell.
                  </p>
                  <p className="text mt-3" style={{ textAlign: 'justify' }}>
                    NVCTI hosts encouraging and informative seminars, webinars
                    like <strong>Innovative Leader Talk Series (ILTS)</strong>{' '}
                    and workshops like Vimarsh and Margdarshan in association
                    with dignified guest speakers and experts. In addition, the
                    centre also hosts numerous competitions, hackathons and
                    contests like{' '}
                    <strong>Avishkar</strong>,{' '}
                    <strong>Web It Up</strong> and <strong>App It Up</strong>{' '}
                    for the students of <strong>IIT(ISM) Dhanbad</strong> and
                    outside.{' '}
                    <strong>
                      Naresh Vashisht Centre for Tinkering and Innovation
                    </strong>{' '}
                    is open to collaborations with organisations, institutions
                    and alumni, for the organisation of encouraging and
                    informative events. Our current collaborations include{' '}
                    <strong>Samsung Innovation Awards</strong> and{' '}
                    <strong>Piyush Dutta Innovation and Invention Award</strong>
                    .
                  </p>
                </div>
              </Fade>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default EventInfo
