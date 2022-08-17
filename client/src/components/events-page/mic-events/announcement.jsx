import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Row, Col, Alert } from 'react-bootstrap'
import Loader from '../../common/loader'

export default function Announcement() {
  const [announcement, setAnnouncement] = useState({})
  const [hasError, setHasError] = useState(false)
  useEffect(() => {
    axios
      .get('https://api.mic.gov.in/api/get-mic-announcement')
      .then((response) => {
        Object.keys(response.data).forEach((key, i) => {
          if (i < 2) {
            delete response.data[key]
          } else if (response.data[key].length !== 0) {
            let arr = []
            let j = 0
            for (let k = 0; k < response.data[key].length; k++) {
              if (j > 2) {
                break
              }
              if (response.data[key][k].announcementType === 'Text') {
                arr.push(response.data[key][k])
                j++
              }
            }
            response.data[key] = arr
          }
        })
        setAnnouncement(response.data)
      })
      .catch((err) => {
        console.warn(err)
        setHasError(true)
      })
  }, [])
  return (
    <>
      {!hasError ? (
        <Container className="mt-5 pt-3">
          <Row>
            <Col className="justify-align-center">
              <h1 className="display-3">ANNOUNCEMENTS</h1>
            </Col>
          </Row>
          <Row>
            <Container id="announcements">
              <Row>
                <Col xs={12}>
                  <div className="announcements_tabs">
                    {Object.keys(announcement).length !== 0 ? (
                      <Tabs>
                        {Object.keys(announcement).map((key, i) => (
                          <Tab label={key.toUpperCase()} key={i}>
                            <div>
                              <Row className="justify-align-center announcements">
                                {announcement[key].length !== 0 ? (
                                  <>
                                    {announcement[key].map((announce, i) => {
                                      if (i > 3) {
                                        return null
                                      } else {
                                        return (
                                          <Col
                                            className="announcement text-align-center"
                                            xs={4}
                                            key={i}>
                                            <a
                                              href={
                                                announce.text_url &&
                                                !(announce.text_url === '0')
                                                  ? announce.text_url
                                                  : 'javascript:void'
                                              }>
                                              {announce.announcement}
                                            </a>
                                          </Col>
                                        )
                                      }
                                    })}
                                  </>
                                ) : (
                                  <Alert
                                    style={{ width: '80%' }}
                                    variant="info">
                                    There is no Notification
                                  </Alert>
                                )}
                              </Row>
                            </div>
                          </Tab>
                        ))}
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
                  </div>
                </Col>
              </Row>
            </Container>
          </Row>
        </Container>
      ) : (
        <></>
      )}
    </>
  )
}

function Tabs(props) {
  const [activeTab, setActiveTab] = useState(props.children[0].props.label)
  const changeTab = (tab) => {
    setActiveTab(tab)
  }
  let content
  let buttons = []
  return (
    <div>
      {React.Children.map(props.children, (child) => {
        buttons.push(child.props.label)
        if (child.props.label === activeTab) content = child.props.children
      })}

      <TabButtons
        activeTab={activeTab}
        buttons={buttons}
        changeTab={changeTab}
      />
      <div className="tab-content">{content}</div>
    </div>
  )
}

const TabButtons = ({ buttons, changeTab, activeTab }) => {
  return (
    <div className="tab-buttons">
      {buttons.map((button) => {
        return (
          <button
            className={button === activeTab ? 'active' : ''}
            onClick={() => changeTab(button)}>
            {button}
          </button>
        )
      })}
    </div>
  )
}

const Tab = (props) => {
  return <React.Fragment>{props.children}</React.Fragment>
}
