import React from 'react'
import { Col, Row, Card } from 'react-bootstrap'
import {
  faCheckCircle,
  faWindowClose,
  faClock
} from '@fortawesome/free-regular-svg-icons'
import { Fade } from 'react-reveal'
import InfoCard from '../common/infoCard'
import { connect } from 'react-redux'
import Loader from '../common/loader'

const ProfileInfo = ({ application, loading }) => {
  let len = 0;
  if(application.pending && application.pending.length)
    len += application.pending.length
  if(application.reverted && application.reverted.length)
    len += application.reverted.length
  return (
    <Card className="profile-info mb-5">
      <Fade>
        <Card.Title className="align-center status" style={{ display: 'block' }}>
          Application Status
        </Card.Title>
      </Fade>
      {loading ? (
        <Row className="no-gutters">
          <div
            style={{ marginTop: '40px', marginBottom: '20px' }}
            className="justify-align-center">
            <Loader
              variant="dark"
              message="Hold on a little 😃, we're getting the information!"
              extraStyle={{ fontSize: '20px' }}
            />
          </div>
        </Row>
      ) : (
        <Row className="no-gutters">
          <Col sm={6} md={4} xl={4}>
            <Fade>
              <InfoCard
                icon={faCheckCircle}
                title="Accepted"
                number={application.approved.length}
              />
            </Fade>
          </Col>
          <Col sm={6} md={4} xl={4}>
            <Fade>
              <InfoCard
                icon={faWindowClose}
                title="Rejected"
                number={application.rejected.length}
              />
            </Fade>
          </Col>
          <Col sm={6} md={4} xl={4}>
            <Fade>
              <InfoCard icon={faClock} title="Pending" number={len} />
            </Fade>
          </Col>
        </Row>
      )}
    </Card>
  )
}

const mapStateToProps = ({ application }) => ({
  application: application
})

export default connect(mapStateToProps, null)(ProfileInfo)
