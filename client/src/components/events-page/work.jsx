import React from 'react';
import { Link } from "react-router-dom";
import {Container, Row,Col } from 'react-bootstrap';
import { Fade } from 'react-reveal';

const Work = () => {
    return (
      <section className="events-work">
        <Container>
          <Row>
            <Col sm={12} lg={6} md={6}>
              <Fade>
                <div className="events-work-div">
                  <h2>Want to work with us?</h2>
                  <Link to='/contact' style={{
                    color: 'white',
                    textTransform: 'uppercase',
                    fontSize: '16px',
                    letterSpacing: '1px',
                    backgroundColor: 'transparent',
                    padding: '9px 40px',
                    fontWeight: 600,
                    border: '2px solid white',
                    transition: 'all .3s ease 0s',
                    width: 'max-content'
                  }}>Let's Talk</Link>
                </div>
              </Fade>
            </Col>
            <Col sm={12} lg={6} md={6}>
              <Fade>
                <div className="events-work-div">
                  <h2>Want our event calender?</h2>
                  <button>Click here!</button>
                </div>
              </Fade>
            </Col>
          </Row>
        </Container>
      </section>
    );
}

export default Work
