import React, { useEffect, useState, lazy, Suspense } from 'react'
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap'
import { Fade } from 'react-reveal'
import { connect } from 'react-redux'
import { setMicEvents } from '../../../redux/actions/eventActions'
import Loader from '../../common/loader'
import Announcement from './announcement'
import Tabletop from 'tabletop'
const SingleEventCard = lazy(() => import('../single-event-card'))

function count(array, value) {
  return array.filter((v) => v === value).length
}

const MicInfo = ({ setMicEvents, mic }) => {
  const [key, setKey] = useState(new Date().getFullYear())
  var array = []
  useEffect(() => {
    let mounted = true
    Tabletop.init({
      key: '1uPsAIRwIACSl4Qi7by3HAY9QKICW3n3NtieFLTX2vDc',
      simpleSheet: true
    })
      .then((data) => {
        if (mounted) {
          setMicEvents(data)
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
                  <p className="text mt-4" style={{ fontSize: '20px' }}>
                    The <strong>Institution Innovation Council</strong> of{' '}
                    <strong>IIT (ISM) Dhanbad</strong> , affiliated to the{' '}
                    <strong>
                      Ministry of Education’s Innovation Cell (MIC)
                    </strong>
                    , organises various activities, competitions and webinars as
                    prescribed. Some of these activities include webinars and
                    seminars on the most recent government policies concerning
                    academics and workshops on entrepreneurship and innovation.
                    MIC also encourages panel discussions with{' '}
                    <strong>student panellists</strong>,{' '}
                    <strong>field exposure</strong> and{' '}
                    <strong>orientation sessions</strong>. All the MIC
                    prescribed activities are organised from time-to-time in
                    every quarter.
                  </p>
                </div>
              </Fade>
            </Col>
          </Row>

          {mic.length !== 0 ? (
            <Tabs
              id="controlled-tab-example"
              activeKey={key}
              onSelect={(key) => setKey(key)}>
              {mic.map((item, i) => {
                array = [...array, item['YEAR']]
                let galleryData = item['GALLERY'].split(',')
                if (count(array, item['YEAR']) === 1) {
                  return (
                    <Tab eventKey={item['YEAR']} title={item['YEAR']} key={i}>
                      <SingleEventCard
                        img={item['PHOTO']}
                        title={item['EVENT NAME']}
                        date={item['DATE']}
                        link={item['REGISTERATION LINK']}
                        desc={item['DESCRIPTION']}
                        gallery={galleryData}
                        winner={item['WINNER']}
                        eventType="flagship"
                      />
                    </Tab>
                  )
                } else {
                  return (
                    <Tab eventKey={item['YEAR']} key={i}>
                      <SingleEventCard
                        img={item['PHOTO']}
                        title={item['EVENT NAME']}
                        date={item['DATE']}
                        link={item['REGISTERATION LINK']}
                        desc={item['DESCRIPTION']}
                        eventType="flagship"
                        gallery={galleryData}
                        winner={item['WINNER']}
                      />
                    </Tab>
                  )
                }
              })}
            </Tabs>
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
        </Container>
        <Announcement></Announcement>
      </section>
    </Suspense>
  )
}

const mapStateToProps = ({ event }) => ({
  mic: event.mic
})

const mapDispatchToProps = (dispatch) => ({
  setMicEvents: (data) => dispatch(setMicEvents(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(MicInfo)
