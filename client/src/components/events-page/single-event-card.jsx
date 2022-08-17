import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import { Fade } from 'react-reveal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons'
import { setCurrentPhotos } from '../../redux/actions/eventActions'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Loader from '../common/loader'
import LazyLoad from 'react-lazyload'

const SingleEventCard = ({
  img,
  title,
  date,
  link,
  desc,
  eventType,
  gallery,
  setCurrentPhotos,
  docs,
  winner
}) => {
  const history = useHistory()
  const handleGalleryClick = () => {
    setCurrentPhotos(gallery)
    localStorage.setItem('galleryTitle', title)
    history.push(`/gallery/${title}/${date}`)
  }

  const handleClick = () => {
    window.open(link, '_blank')
  }

  const handleDocsClick = () => {
    window.open(docs ? docs : '', '_blank')
  }

  return (
    <Container
      className="card-container mt-4"
      style={{ background: '#fff', maxWidth: '100vw', height: '100%' }}>
      <Row>
        <Col md={6} sm={12} lg={5} className="left-side justify-align-center">
          <Fade>
            <LazyLoad once={true} placeholder={<Loader variant="dark" />}>
              <img src={img} alt="event-pic" className="event-pic" />
            </LazyLoad>
          </Fade>
        </Col>
        <Col md={6} sm={12} lg={7} className="right-side justify-align-center">
          <Fade>
            <div className="card-block" style={{ width: '100%' }}>
              <h4 className="card-title" style={{ textAlign: 'center' }}>
                {title}
              </h4>
              <p className="card-text">
                <FontAwesomeIcon icon={faCalendarAlt} /> {date}
              </p>
              <p className="card-text">{desc}</p>
              <br />
              <div className="card-button">
                {eventType === 'upcoming' ? (
                  <button className="styleme" onClick={handleClick}>
                    Register Here
                  </button>
                ) : (
                  <button className="styleme" onClick={handleGalleryClick}>
                    Gallery
                  </button>
                )}{' '}
                {typeof docs !== 'undefined' && docs ? (
                  <button
                    className="styleme"
                    onClick={handleDocsClick}
                    style={{ marginLeft: '3px' }}>
                    Flyer/Documents
                  </button>
                ) : null}
                {typeof winner !== 'undefined' && winner ? (
                  <a
                    className="styleme"
                    href={winner}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginLeft: '3px' }}>
                    Winner
                  </a>
                ) : null}
              </div>
            </div>
          </Fade>
        </Col>
      </Row>
    </Container>
  )
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentPhotos: (data) => dispatch(setCurrentPhotos(data))
})

export default connect(null, mapDispatchToProps)(SingleEventCard)
