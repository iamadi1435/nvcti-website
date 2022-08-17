import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLightbulb,
  faCommentDots,
  faEdit,
  faTasks
} from '@fortawesome/free-solid-svg-icons'
import Fade from 'react-reveal/Fade'
export default function Flip() {
  return (
    <Container
      style={{
        background: '#f2f2f2',
        maxWidth: '100vw',
        paddingBottom: '80px'
      }}>
      <Row className="show-grid justify-center flip-card-row">
        {data.map((item) => (
          <Col
            key={item.id}
            lg={3}
            md={6}
            sm={12}
            style={{ paddingBottom: '2%', paddingTop: '2%', width: '100%' }}
            className="justify-center">
            <Fade>
              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <FontAwesomeIcon icon={item.icon} size="2x" />
                    <h1>{item.title}</h1>
                  </div>
                  <div className="flip-card-back">
                    <FontAwesomeIcon icon={item.icon} size="2x" />
                    <h1 style={{ marginBottom: 0 }}>{item.title}</h1>
                    <p className="px-2">{item.text}</p>
                  </div>
                </div>
              </div>
            </Fade>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

const data = [
  {
    id: 1,
    icon: faCommentDots,
    title: 'Think',
    text: 'Bring out your creative ideas and reach us out.'
  },
  {
    id: 2,
    icon: faEdit,
    title: 'Design',
    text: 'Plan your ideas to transform them into a designed project.'
  },
  {
    id: 3,
    icon: faTasks,
    title: 'Develop',
    text: 'Carry your project in our technologically advanced labs.'
  },
  {
    id: 4,
    icon: faLightbulb,
    title: 'Inspire',
    text: 'Motivate million other young talents by your achievement.'
  }
]
