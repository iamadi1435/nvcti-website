import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Fade } from 'react-reveal'

const BrochureDownload = () => {
  const data = {
    text: 'Download Brochure',
    link: 'https://drive.google.com/file/d/1LjjfPIbbAL1E73RqeOeLDL_XqF3kNIuK/view?usp=sharing'
  }
  return (
    <section className="page-section sp-top-bottom40" id="contact">
      <Container>
        <Fade top cascade>
          <Row id="register-info-row">
            <Col className="justify-align-center" xs={6} sm={6} md={8} lg={8}>
              <div>
                <div className="text-about">
                  <div className="ab-content">
                    <Button href={data.link} className="button mt-2">
                      {data.text}
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Fade>
      </Container>
    </section>
  )
}

export default BrochureDownload
