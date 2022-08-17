import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebook,
  faInstagram,
  faLinkedinIn
} from '@fortawesome/free-brands-svg-icons';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'
import { Fade } from 'react-reveal'

const ComingSoon = () => {
  const history = useHistory()
  useEffect(() => {
    const func = () => {
      document.title = 'Coming Soon | NVCTI'
    }
    func()
  }, [])
  return (
    <Fade>
      <div className="coming_soon_wrapper">
        <h1>
          Coming Soon<span className="dot">.</span>
        </h1>
        <p>We're still working on this page, please come back later.</p>
        <div className="icons">
          {data.map((item, ind) => {
            return (
              <a
                href={item.link}
                key={item + ind}
                className="media_link"
                target="_blank"
                rel="noopener noreferrer"
                style={{ paddingLeft: '0' }}>
                <FontAwesomeIcon icon={item.icon} />
              </a>
            )
          })}
        </div>
        <button className="home_link mt-3" onClick={() => history.goBack()}>
          Go back <FontAwesomeIcon icon={faArrowCircleRight} style={{ marginLeft: '15px' }} />
        </button>
      </div>
    </Fade>
  )
}

export default ComingSoon

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
  }
]
