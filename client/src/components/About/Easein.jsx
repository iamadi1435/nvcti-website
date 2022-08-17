import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMouse, faChartLine, faTv } from "@fortawesome/free-solid-svg-icons";
import Fade from "react-reveal/Fade";
export default function Easein() {
  return (
    <Container
      className="about-ease-in"
      style={{ background: "#f2f2f2", maxWidth:"100vw",paddingBottom:"40px"}}
    >
      <Row className="show-grid justify-center" style={{width:"100%", margin:"0"}}>
        {data.map((item, ind) => (
          <Col
            key={ind + item}
            lg={4}
            md={4}
            sm={12}
            style={{ flexDirection: "column" }}
            className={
              "hover-me-1 justify-align-center " + (ind !== 2 && "clearfix")
            }
          >
            <Fade>
              <FontAwesomeIcon
                icon={item.icon}
                className="appear1 about-icon"
                size="2x"
              />
              <h2
                style={{ margin: "0 auto", textAlign: "center" }}
                className="disappear1"
              >
                {item.title}
              </h2>
              <p
                style={{ fontSize: "18px", textAlign: "center" }}
                className="changeme"
              >
                {item.desc}
              </p>
            </Fade>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

const data = [
  {
    icon: faMouse,
    title: "Technology",
    desc:
      "Various technological advancements contribute emphatically to the society & economy",
  },
  {
    icon: faChartLine,
    title: "Strategy",
    desc:
      "Moulding youth into innovators through adopting self-dependency and free-thinking.",
  },
  {
    icon: faTv,
    title: "Creativity",
    desc:
      "Enhancement of artistry by encouraging large optimistic team projects at our modern tinkering labs.",
  },
];
