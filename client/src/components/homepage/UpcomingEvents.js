import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Fade } from 'react-reveal'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Tabletop from 'tabletop'
import { setUpcomingEvents } from '../../redux/actions/eventActions'
import ImageSlider from '../common/imageSlider'

const UpcomingEvents = ({ setOngoingEvents }) => {
  useEffect(() => {
    let mounted = true
    Tabletop.init({
      key: '1huKtLiszWNlZDsux2Vu2tqUOjZJZHHFOk7vSnRkL-Pc',
      simpleSheet: true,
    })
      .then((data) => {
        if (mounted) {
          setOngoingEvents(data)
        }
      })
      .catch((err) => console.warn(err))
    return () => (mounted = false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container fluid>
      <Row>
        <Col sm={12} xs={12} md={12} lg={12}>
          <Fade>
            <ImageSlider title="UPCOMING EVENTS" lazy={true}/>
          </Fade>
        </Col>
      </Row>
    </Container>
  )
}

UpcomingEvents.propTypes = {
  setUpcomingEvents: PropTypes.func.isRequired,
}

const mapStateToProps = ({ event }) => ({
  upcoming: event.upcoming,
})

const mapDispatchToProps = (dispatch) => ({
  setUpcomingEvents: (data) => dispatch(setUpcomingEvents(data)),
})


export default connect(mapStateToProps, mapDispatchToProps)(UpcomingEvents)
