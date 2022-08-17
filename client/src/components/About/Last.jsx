import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import Fade from "react-reveal/Fade";

export default function Last() {
  return (
    <Container>
      <Row style={{ marginTop: "150px" }} className="p-4 mission-div">
        <h2>MISSION</h2>
      </Row>
      <Row style={{ marginBottom: "150px" }} className="mt-3 pb-4 show-grid justify-center">
        {data.map((item, ind) => (
          <Col lg={3} md={6} sm={12} key={item + ind}>
            <Fade>
              <div className="color-me">
                <h2>{item.title}</h2>
                <p>{item.text}</p>
              </div>
            </Fade>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

const data = [
  {
    title: "1.",
    text: "To encourage, inspire and nurture young brains by supporting them to work with new ideas and converting them into concept and prototype.",
  },
  {
    title: "2.",
    text: "To generate innovative solutions relevant to the local and global problems through experimentation, innovation and creativity.",
  },
  {
    title: "3.",
    text: "To attract a large number of youth who demonstrate problem solving zeal and abilities to work on new technology/innovation based start-ups.",
  },
  {
    title: "4.",
    text: "To build a vibrant innovation ecosystem by establishing a network between innovators, academia and incubators.",
  },
];
