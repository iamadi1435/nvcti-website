import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { Fade } from "react-reveal";

const RegisterInfo = () => {
    return (
      <section
        className="page-section sp-top-bottom40"
        id="contact"
        style={{
          maxHeight: '140px'
        }}
      >
        <Container>
          <Fade top cascade>
            <Row id="register-info-row">
              {data.map((item, ind) => {
                const { heading } = item;
                return (
                  <Col className="justify-align-center" key={item+ind} xs={12} sm={12} md={8} lg={8}>
                    <div>
                      <div className="text-about">
                        {/*<div className="ab-icon">
                          <FontAwesomeIcon icon={icon} />
                        </div>*/}
                        <div className="ab-content">
                          <h3 className="font-weight-bold mb-0">{heading}</h3>
                        </div>
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </Fade>
        </Container>
      </section>
    );
}

export default RegisterInfo;

const data = [
  {
    icon: faLightbulb,
    heading: "Register to take your first step to success".toLocaleUpperCase()
  }
];

