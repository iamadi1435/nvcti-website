import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import Fade from "react-reveal/Fade";
import Logo from "../../assets/logo/nvcti-transparent-no-text.png";
export default function Details() {
  return (
    <Container style={{ maxWidth: "100vw" }}>
      <Row
        style={{
          marginTop: "150px",
          marginBottom: "150px",
        }}
        className="show-grid justify-center"
      >
        <Col lg={3} md={3} sm={12} style={{ paddingBottom: "2%" }}>
          <Fade>
            <div className="pl-4">
              <h1>NVCTI,</h1>
              <h3>Innovation Cell of IIT ISM</h3>
              <hr
                style={{
                  width: "80%",
                  paddingBottom: "2px",
                  paddingTop: "20px",
                }}
              ></hr>

              <p style={{ fontSize: "18px" }}>Fostering Innovation</p>
              <div className="my-3">
                <img src={Logo} alt="logo" className="about-image" width="150px" height="auto" />
              </div>
            </div>
          </Fade>
        </Col>

        <Col lg={4} md={4} sm={12} style={{ paddingBottom: "2%" }}>
          <Fade>
            <p style={{ fontSize: "20px" }}>
              With the mission to provide students with a platform for promoting experimentation, innovation and creative output skills, we, at NVCTI are
              putting endeavours to inculcate convoluted thinking in an aesthetic approach in the minds of students and faculty members by polarizing thoughts
              into the process and thereby into a product.
            </p>
            <p style={{ fontSize: "20px" }}>
              We also promote an innovation ecosystem to subsidize our students in their quest to explore and contribute to the world of cutting-edge
              technologies and entrepreneurship.
            </p>
          </Fade>
        </Col>

        <Col lg={4} md={4} sm={12} style={{ paddingBottom: "2%" }}>
          <Fade>
            <p style={{ fontSize: "20px" }}>
              Our vision is to cultivate young fertile brains as the innovators and entrepreneurs of the future by promoting informal learning with a focus on
              indigenuos technology and advancements aimed at contributing positively to the economy, the environment and the society.
            </p>
          </Fade>
        </Col>
      </Row>
    </Container>
  );
}
