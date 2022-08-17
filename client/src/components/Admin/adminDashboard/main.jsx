import React, { useState, useEffect, lazy } from 'react'
import { Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  getAllExternalUserApplications,
  getAllIITISMUserApplications
} from '../../../redux/actions/adminActions'
const AdminTable = lazy(() => import('./adminTable'))
const AdminFeed = lazy(() => import('./feed'))

const AdminMain = ({
  getAllExternalUserApplications,
  getAllIITISMUserApplications,
  adminData
}) => {
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    let mounted = true
    getAllExternalUserApplications(mounted)
    getAllIITISMUserApplications(mounted)
    setLoading(false)
    return () => {
      setLoading(false)
      mounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <section className="profile-main">
      <Row className="mb-3">
        <Col md={7} lg={8} sm={12}>
          <AdminTable
            title="Pending Applications"
            extraClassName="pending"
            ismApplications={adminData.pending}
            externalApplications={adminData.pendingOther}
            loading={loading}
          />
        </Col>
        <Col md={5} lg={4} sm={12}>
          <AdminFeed data={adminData} />
        </Col>
      </Row>
      <Row>
        <Col sm={12} lg={6} md={6}>
          <AdminTable
            title="Accepted Applications"
            extraClassName="approved"
            ismApplications={adminData.approved}
            externalApplications={adminData.approvedOther}
            loading={loading}
          />
        </Col>
        <Col sm={12} lg={6} md={6}>
          <AdminTable
            title="Rejected Applications"
            extraClassName="rejected"
            ismApplications={adminData.rejected}
            externalApplications={adminData.rejectedOther}
            loading={loading}
          />
        </Col>
      </Row>
    </section>
  )
}

AdminMain.propTypes = {
  getAllIITISMUserApplications: PropTypes.func.isRequired,
  getAllExternalUserApplications: PropTypes.func.isRequired
}

const mapStateToProps = ({ admin }) => ({
  adminData: admin
})

export default connect(mapStateToProps, {
  getAllIITISMUserApplications,
  getAllExternalUserApplications
})(AdminMain)
