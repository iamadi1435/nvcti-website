import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

const AdminStructure = () => {
  return (
    <Container>
      <Row className="mb-3 p-4">
        <h2>ADMINISTRATIVE STRUCTURE</h2>
        <p>
          The NVCTI and its laboratory will be managed and maintained jointly by
          a team of dedicated students under ample guidance from faculty and
          technical staff. The facility of the laboratory, will be open to all
          students of the Institute, irrespective of their discipline.
          Schematically the administrative set-up of the centre is as follows -
        </p>
      </Row>
      <Row>
        <Col md={12}>
          {' '}
          <section id="conference-timeline">
            <div className="conference-center-line"></div>
            <div className="conference-timeline-content">
              <div className="timeline-article">
                <div className="content-left-container">
                  <div className="content-left">
                    <p>
                      DIRECTOR
                      <br />
                      DY. DIRECTOR
                      <br />
                      DEAN (IIE)
                      <br />
                      A. DEAN (I)
                      <span className="article-number">01</span>
                    </p>
                  </div>
                </div>
                <div className="meta-date">
                  <FontAwesomeIcon style={{ fontSize: '20px' }} icon={faUser} />
                </div>
              </div>
              <div className="timeline-article">
                <div className="content-right-container">
                  <div className="content-right">
                    <p>
                      HOC
                      <br />
                      LAB INCHARGES / FIC
                      <br />
                      TECHNICAL STAFF
                      <br />
                      CENTRE SUPERVISOR
                      <br />
                      STUDENT CORE GROUP
                      <br />
                      USERS
                      <span className="article-number">02</span>
                    </p>
                  </div>
                </div>
                <div className="meta-date">
                  <FontAwesomeIcon style={{ fontSize: '17px' }} icon={faUser} />
                </div>
              </div>
              <div className="timeline-article">
                <div className="content-left-container">
                  <div className="content-left">
                    <p>
                      SIC
                      <br />
                      TECHNICAL SOCIETIES
                      <br />
                      INDIVIDUAL (STUDENT)
                      <br />
                      OTHERS
                      <span className="article-number">03</span>
                    </p>
                  </div>
                </div>
                <div className="meta-date">
                  <FontAwesomeIcon style={{ fontSize: '20px' }} icon={faUser} />
                </div>
              </div>
            </div>
          </section>
        </Col>
      </Row>
    </Container>
  )
};

export default AdminStructure;
