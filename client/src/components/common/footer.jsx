import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebook,
  faInstagram,
  faLinkedinIn,
  faYoutube,
  faTwitter
} from '@fortawesome/free-brands-svg-icons'
import { Fade } from 'react-reveal'
const Footer = ({ extraStyle }) => {
  const data = [
    {
      icon: faFacebook,
      name: 'facebook',
      link: 'https://www.facebook.com/nvcti/'
    },
    {
      icon: faLinkedinIn,
      name: 'linkedin',
      link: 'https://www.linkedin.com/company/nvcti-iitism'
    },
    {
      icon: faInstagram,
      name: 'instagram',
      link: 'https://www.instagram.com/nvcti.iitism/'
    },
    {
      icon: faYoutube,
      name: 'youtube',
      link: 'https://www.youtube.com/channel/UC4Uw9mJgYrssRq6vC7fO3fA'
    },
    {
      icon: faTwitter,
      name: 'twitter',
      link: 'https://twitter.com/nvcti1'
    }
  ]
  return (
    <div className="word-section footer justify-center" style={extraStyle}>
      <div className="footer_logo"></div>
      <Fade>
        <div className="left">
          <h2>Naresh Vashisht Centre for Tinkering and Innovation</h2>
          <p className="lead" style={{ textAlign: 'justify' }}>
            With the mission to provide students with a platform for promoting
            experimentation, innovation and creative output skills, we, at NVCTI
            are putting endeavours to inculcate convoluted thinking in an
            aesthetic approach in the minds of students and faculty members by
            polarizing thoughts into the process and thereby into a product.{' '}
          </p>
        </div>
      </Fade>
      <Fade>
        <div className="right">
          <h3 className="connect-text">Connect With Us:</h3>
          <div className="social-links d-flex">
            {data.map((item, ind) => {
              const { icon, link, name } = item
              return (
                <span key={item + ind} className="mr-3">
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ paddingLeft: '0' }}>
                    <FontAwesomeIcon icon={icon} className={name} />
                  </a>
                </span>
              )
            })}
          </div>
        </div>
      </Fade>
      <Fade>
        <div className="bottom-div jusitfy-align-center">
          <p className="first-text my-1">- © IIT (ISM) Dhanbad 2021 -</p>
          <p className="second-text text-center">
            <span>Made with</span> <span style={{ color: 'red' }}>❤</span>{' '}
            <span>by SIC </span>
          </p>
        </div>
      </Fade>
    </div>
  )
}

export default Footer
