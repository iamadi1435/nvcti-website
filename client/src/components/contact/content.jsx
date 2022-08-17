import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import FormInput from '../common/formInput'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faInfoCircle,
  faMapMarkerAlt,
  faPhoneAlt,
  faPen
} from '@fortawesome/free-solid-svg-icons'
import { Fade } from 'react-reveal'
import { sendMessage } from '../../redux/actions/messageActions'
import Loader from '../common/loader'
import ContactInfo from './contactInfo'

const LeftSide = () => {
  return (
    <div className="outer-div one" style={{ width: '100%' }}>
      <Fade left cascade>
        <div className="section-title center-xs">
          <h3 className="header">Contact Information</h3>
          <br />
          <Fade left cascade>
            <div className="clearfix">
              <Row>
                {data.map((item, ind) => {
                  const { icon, heading, text, type, list } = item
                  return (
                    <Col
                      key={item + ind}
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      className={ind !== 0 && 'pt-3'}>
                      <>
                        <div className="text-about">
                          <div className="ab-icon">
                            <FontAwesomeIcon
                              icon={icon}
                              className="about-icon"
                            />
                            <h4 className="font-weight-bold">{heading}</h4>
                          </div>
                          <div className="ab-content">
                            {type && list ? (
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: list.join(', ')
                                }}></p>
                            ) : (
                              <p>{text}</p>
                            )}
                          </div>
                        </div>
                      </>
                    </Col>
                  )
                })}
              </Row>
              {/* <h3 className="hs1">Location</h3>
									<p>The Pride, L. Berbeckiego 2/5, 44-100 Gliwice, Poland</p> */}
            </div>
          </Fade>
        </div>
      </Fade>
    </div>
  )
}

const RightSide = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const [status, setStatus] = useState({
    activity: 'inactive',
    message: null
  })

  const setToInactive = function () {
    setStatus({
      activity: 'inactive',
      message: null
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let cb = function () {}
    try {
      setStatus({ activity: 'loading', message: null })
      let res = await sendMessage(data, cb)
      if (res.data.success) {
        setStatus({ activity: 'success', message: 'Successfully sent!' })
      }
    } catch (err) {
      setStatus({ activity: 'error', message: err.data.message })
      setTimeout(setToInactive, 2000)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  return (
    <div className="outer-div dark" style={{ height: '100%', width: '100%' }}>
      <Fade right cascade>
        <div className="section-title center-xs">
          <h3 className="header">Say something!</h3>
          <br />
          {/*<div className="sm-top-bottom40">
						<p className="font-italic fw500">
							Lorem ipsum dolor sit amet, adipisicing qui dolorem ipsum quia
							dolor sit amet do eiusmod tempor incididunt.
						</p>
					</div>*/}
          <Fade right cascade>
            <form onSubmit={handleSubmit} className="contact-form">
              <Fade right cascade>
                <div className="clearfix">
                  <FormInput
                    name="name"
                    value={data.name}
                    placeholder="NAME"
                    required
                    handleChange={handleChange}
                  />
                  <FormInput
                    name="email"
                    value={data.email}
                    placeholder="EMAIL"
                    required
                    type="email"
                    handleChange={handleChange}
                  />
                  <textarea
                    placeholder="MESSAGE"
                    rows="6"
                    style={{ height: '89px' }}
                    required
                    value={data.message}
                    name="message"
                    onChange={handleChange}></textarea>
                </div>
                <div className="clearfix">
                  <Row>
                    <Col md={12} lg={12} sm={12} xs={12}>
                      <div className="form-tip sp-top20">
                        <FontAwesomeIcon icon={faInfoCircle} className="pr-1" />
                        All the fields are required
                      </div>
                    </Col>
                    <Col md={12} lg={12} sm={12} xs={12}>
                      <div className="sp-top20">
                        {status.activity === 'loading' ? (
                          <Loader variant="light" />
                        ) : status.activity === 'inactive' ? (
                          <button type="submit" className="custom-button">
                            Submit message
                          </button>
                        ) : status.activity === 'success' ? (
                          <h5 style={{ color: 'greenyellow' }}>
                            {status.message}
                          </h5>
                        ) : (
                          <h5 style={{ color: 'red' }}>{status.message}</h5>
                        )}
                      </div>
                    </Col>
                  </Row>
                </div>
              </Fade>
            </form>
          </Fade>
        </div>
      </Fade>
    </div>
  )
}

const MainContent = () => {
  return (
    <>
      <section className="page-section grey-section">
        <Row>
          <Col sm={12} xs={12} md={6} lg={6}>
            <LeftSide />
          </Col>
          <Col
            sm={12}
            xs={12}
            md={6}
            lg={6}
            style={{ backgroundColor: '#212121' }}>
            <RightSide />
          </Col>
        </Row>
      </section>
      <div className="container pt-4 mt-5">
        <Row>
          <Col className="google-map" xs={12}>
            <iframe
              title="NVCTI google map"
              width="100%"
              height="410"
              src="https://www.google.com/maps/embed/v1/place?q=NVCTI, IIT ISM DHANBAD,Dhanbad,Jharkhand,India&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"></iframe>
          </Col>
        </Row>
      </div>
      <ContactInfo />
    </>
  )
}

export default MainContent

const data = [
  {
    icon: faMapMarkerAlt,
    heading: 'VISIT US',
    text: 'Naresh Vashisht Centre for Tinkering and Innovation IIT (ISM) Dhanbad, Dhanbad, Jharkhand - 826004'
  },
  {
    icon: faPen,
    heading: 'WRITE TO US',
    text: 'Email: nvcti@iitism.ac.in, sic_nvcti@iitism.ac.in',
    type: 'email',
    list: [
      '<a href="mailto:nvcti@iitism.ac.in">nvcti@iitism.ac.in</a>',
      '<a href="mailto:sic_nvcti@iitism.ac.in">sic_nvcti@iitism.ac.in</a>'
    ]
  },
  {
    icon: faPhoneAlt,
    heading: 'CALL US',
    text: 'Office: +91 94701 94401',
    type: 'phone',
    list: ['Office: <a href="tel:+919470194401">+91 94701 94401</a>']
  }
]
