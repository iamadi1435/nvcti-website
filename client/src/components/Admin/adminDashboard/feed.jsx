import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import {
  faCheckCircle,
  faWindowClose,
  faClock
} from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Fade } from 'react-reveal'

const Item = ({ icon, number, text }) => {
  return (
    <Col md={12} sm={12} lg={12}>
      <div className="feed-item align-center">
        <div className={'feed-icon ml-3 ' + text}>
          <FontAwesomeIcon icon={icon} />
        </div>
        <h6 className="mb-0 ml-1">
          Total number of {text} applications: {number}
        </h6>
      </div>
    </Col>
  )
}

const AdminFeed = ({ data }) => {
  let len_sum = 0
  if (data.pending && data.pending.length) len_sum += data.pending.length
  if (data.pendingOther && data.pendingOther.length)
    len_sum += data.pendingOther.length
  if (data.revertedOther && data.revertedOther.length)
    len_sum += data.revertedOther.length
  if (data.reverted && data.reverted.length) len_sum += data.reverted.length
  return (
    <Card className="admin-feed mb-5 pb-5">
      <Fade>
        <Card.Header className="feed">
          <Card.Title className="align-center" style={{ display: 'block' }}>
            Feeds
          </Card.Title>
        </Card.Header>
      </Fade>
      <Row className="no-gutters">
        <Item icon={faClock} text="Pending" number={len_sum} />
        <Item
          icon={faCheckCircle}
          text="Accepted"
          number={data.approved.length + data.approvedOther.length}
        />
        <Item
          icon={faWindowClose}
          text="Rejected"
          number={data.rejected.length + data.rejectedOther.length}
        />
      </Row>
    </Card>
  )
}

export default AdminFeed
