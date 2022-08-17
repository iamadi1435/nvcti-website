import React, { useEffect, useState, lazy, Suspense } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Fade } from 'react-reveal'
import { connect } from 'react-redux'
import {
  setFlagshipEvents,
  setCurrentPhotos,
  setFlagshipEventCategories
} from '../../../redux/actions/eventActions'
import Loader from '../../common/loader'
import Tabletop from 'tabletop'

const EventCategories = lazy(() => import('./EventCategories'))

const FlagshipInfo = ({
  setFlagshipEvents,
  flagship,
  setFlagshipEventCategories,
  flagshipCategories
}) => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    let mounted = true
    Tabletop.init({
      key: '1daDd7disRbYMkM5-lwpylNEuBuYYhKxhcjyHkBmFaJs',
      simpleSheet: true
    })
      .then((data) => {
        if (mounted) {
          setCategories(
            Array.from(
              data.reduce((acc, cur) => acc.add(cur['CATEGORY']), new Set())
            )
          )
          setFlagshipEvents(data)
        }
      })
      .catch((err) => console.warn(err))
    return () => (mounted = false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Suspense
      fallback={
        <div style={{ margin: '100px 0' }} className="justify-align-center">
          <Loader
            extraStyle={{
              height: '2rem',
              width: '2rem',
              borderWidth: '0.3rem'
            }}
          />
        </div>
      }>
      <section className="events single">
        <Container>
          <Row style={{ justifyContent: 'center' }}>
            <Col md={12} sm={12} lg={12}>
              <Fade cascade>
                <div>
                  <p
                    className="text mt-4"
                    style={{ fontSize: '20px', textAlign: 'justify' }}>
                    NVCTI, as the tinkering and innovation centre of IIT (ISM)
                    Dhanbad, organises a{' '}
                    <strong>
                      series of encouraging and educational flagship events
                    </strong>{' '}
                    around the year. Dialogue Series and Innovative Leader Talk
                    Series are two of our main flagship events conducted
                    regularly throughout the academic calendar year. NVCTI has
                    also proposed a hackathon,
                    <strong> Aavishkar</strong>, for school students around
                    Dhanbad area to help mend their thinking process and lead
                    them towards innovations. NVCTI truly believes that an early
                    start goes a long way to shape an individual’s thought
                    process. Our flagship events are specifically designed to
                    cater to this belief and help students in the long run.
                  </p>
                </div>
              </Fade>
            </Col>
          </Row>

          <Row style={{ justifyContent: 'center' }}>
            {categories.length !== 0 ? (
              <EventCategories categories={categories} />
            ) : (
              <div
                style={{ marginTop: '100px' }}
                className="justify-align-center">
                <Loader
                  variant="dark"
                  message="Hold on a little 😃, we're getting the information!"
                  extraStyle={{ fontSize: '20px' }}
                />
              </div>
            )}
          </Row>
        </Container>
      </section>
    </Suspense>
  )
}

const mapStateToProps = ({ event }) => ({
  flagship: event.flagship
})

const mapDispatchToProps = (dispatch) => ({
  setFlagshipEvents: (data) => dispatch(setFlagshipEvents(data)),
  setFlagshipEventCategories: (data) =>
    dispatch(setFlagshipEventCategories(data)),
  setCurrentPhotos: (data) => dispatch(setCurrentPhotos(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(FlagshipInfo)
