import React, { useEffect } from 'react'
import Linkify from 'react-linkify'
import { Col, Container, Row } from 'react-bootstrap'
import { Fade } from 'react-reveal'
import Loader from '../common/loader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandPointRight } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Tabletop from 'tabletop'
import { setAnnouncements } from '../../redux/actions/announcementActions'
import OngoingEvents from './OngoingEvents'

const Announcements = ({ setAnnouncements, announcement }) => {
  useEffect(() => {
    let mounted = true
    Tabletop.init({
      key: '1berU7O6tkcoEBe7prN0SQFQBLoQvM-LaAEuTlgC7N84',
      simpleSheet: true
    })
      .then((data) => {
        if (mounted) {
          setAnnouncements(data)
        }
      })
      .catch((err) => console.warn(err))
    return () => (mounted = false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function stopAll(event) {
    document.querySelectorAll('li.marquee').forEach((el) => {
      el.style.animationPlayState = 'paused'
    })
  }

  function startAll(event) {
    document.querySelectorAll('li.marquee').forEach((el) => {
      el.style.animationPlayState = ''
    })
  }

  return (
    <Container fluid>
      <Row>
        <Col sm={12} xs={12} md={12} lg={8}>
          <OngoingEvents />
        </Col>
        <Col sm={12} xs={12} md={12} lg={4}>
          <div className="word-section slider justify-align-center">
            <Fade>
              <h2 className="mb-5 uppercase flexD-row">Announcements</h2>
            </Fade>

            <Fade>
              <ul
                className="announcement-list"
                style={{ display: announcement.length !== 0 && 'list-item' }}>
                {announcement.length !== 0 ? (
                  announcement.map((item, i) => (
                    <li
                      key={item + i}
                      className="align-center mb-3 marquee"
                      onMouseOver={stopAll}
                      onMouseOut={startAll}>
                      <FontAwesomeIcon icon={faHandPointRight} />
                      <p style={{ marginBottom: '0', marginLeft: '20px' }}>
                        <Linkify>{item['ANNOUNCEMENTS']}</Linkify>
                      </p>
                    </li>
                  ))
                ) : (
                  <div
                    style={{ flexDirection: 'row' }}
                    className="justify-align-center">
                    <Loader letiant="dark" />
                  </div>
                )}
              </ul>
            </Fade>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

Announcements.propTypes = {
  setAnnouncements: PropTypes.func.isRequired
}

const mapStateToProps = ({ announcement, event }) => ({
  announcement: announcement.announcements,
  upcoming: event.upcoming
})

const mapDispatchToProps = (dispatch) => ({
  setAnnouncements: (data) => dispatch(setAnnouncements(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Announcements)
