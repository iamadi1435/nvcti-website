import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { Fade } from 'react-reveal'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Tabletop from 'tabletop'
import { setOngoingEvents } from '../../redux/actions/eventActions'
import OngoingImageSlider from './OngoingImageSlider'

const OngoingEvents = ({ setOngoingEvents, ongoing }) => {
  useEffect(() => {
    let mounted = true
    Tabletop.init({
      key: '1huKtLiszWNlZDsux2Vu2tqUOjZJZHHFOk7vSnRkL-Pc',
      simpleSheet: true
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
      <Fade>
        <OngoingImageSlider title="ONGOING EVENTS" lazy={true} ongoing={ongoing}/>
      </Fade>
    </Container>
  )
}

OngoingEvents.propTypes = {
  setOngoingEvents: PropTypes.func.isRequired,
}

const mapStateToProps = ({ event }) => ({
  ongoing: event.ongoing,
})

const mapDispatchToProps = (dispatch) => ({
  setOngoingEvents (data) { return dispatch(setOngoingEvents(data)) },
})

export default connect(mapStateToProps, mapDispatchToProps)(OngoingEvents)
