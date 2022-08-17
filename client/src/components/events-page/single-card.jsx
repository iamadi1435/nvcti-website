import React from "react";
import { Link } from "react-router-dom";
import Img1 from "../../assets/background/upcoming-event-bg.jpg";
import Img2 from "../../assets/background/flagship-event-bg.jpg";
import Img3 from "../../assets/background/mic-event-bg.jpg";
import Img4 from "../../assets/background/other-event-bg.jpg";
import { Container, Row, Col } from "react-bootstrap";
import { Fade } from "react-reveal";

const SingleCard = () => {
  return (
    <div style={{ backgroundColor: "#f8f8f8" }}>
      <Container className="events-card-container">
        <Row className="pb-5 justify-center">
          <Fade>
            <Col md={12} sm={12} lg={12}>
              <h1 className="heading">
                <span>Events</span>
              </h1>
            </Col>
          </Fade>
        </Row>
        <Row className="news">
          {data.map((project, ind) => (
            <Col
              key={project + ind}
              sm={12}
              lg={6}
              md={6}
              className="justify-center"
              style={{ padding: "5px" }}
            >
              <Fade>
                <Link to={"/" + project.link} style={{height:"100%"}}>
                  <figure className="article">
                    <img src={project.img} alt="demo-img" />
                    <figcaption>
                      <div>
                        <h3>{project.title}</h3>
                      </div>
                    </figcaption>
                  </figure>
                </Link>
              </Fade>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default SingleCard;

const data = [
  {
    img: Img1,
    title: "Upcoming Events",
    link: "upcoming-events",
  },
  {
    img: Img2,
    title: "Flagship Events",
    link: "flagship-events",
  },
  {
    img: Img3,
    title: "MIC Events",
    link: "mic-events",
  },
  {
    img: Img4,
    title: "Other Events",
    link: "other-events",
  },
];
