import React, { useState, useEffect } from 'react'
import {
  Row,
  Col,
  Container,
  Modal
} from 'react-bootstrap'
import DashboardImg from '../../assets/logo/dashboard-head.png'
import ProfileInfo from './profileInfo'
import ProfileTable from './profileTable'
import { Fade } from 'react-reveal'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  getAllApplications,
  submitApplication
} from '../../redux/actions/applicationActions'
import PendingTable from './pendingTable'
import IdeaSubmissionModal from './ideaSubmissionModal';

const ErrorModal = (props) => {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          We're Sorry{' '}
          <span role="img" aria-label="sad-emoji">
            🙁
          </span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          You cannot make multiple idea submissions at the same time. Wait till
          your last idea get accepted.
        </p>
      </Modal.Body>
    </Modal>
  )
}

const ProfileTitle = ({
  submitApplication,
  modalShow,
  errModalShow,
  handleClick,
  closeModal,
  closeErrModal
}) => {
  return (
    <Row className="profile-title">
      <Container>
        <Row>
          <Col lg={7} md={7} sm={12} className="title-heading">
            <Fade>
              <div
                className="heading-text-wrapper"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row'
                }}>
                <div className="heading-text-1">
                  <img src={DashboardImg} alt="dashboard-img" />
                </div>
                <div className="heading-text-2">
                  <h4 className="mb-0">Application Dashboard</h4>
                  <p className="mb-0" style={{ fontSize: '15px' }}>
                    This is a dashboard to keep track of all your applications.
                  </p>
                </div>
              </div>
            </Fade>
          </Col>
          <Col lg={5} md={5} sm={12} className="title-actions">
            <IdeaSubmissionModal
              show={modalShow}
              submitApplication={submitApplication}
              onHide={closeModal}
            />
            <ErrorModal show={errModalShow} onHide={closeErrModal} />
            <Fade>
              <button
                className="application-btn"
                style={{ flexDirection: 'row' }}
                onClick={handleClick}>
                <span className="mr-3">+</span>Create New
              </button>
            </Fade>
          </Col>
        </Row>
      </Container>
    </Row>
  )
}

const ProfileMain = ({
  application,
  getAllApplications,
  submitApplication
}) => {
  const [loading, setLoading] = useState(false)
  const [modalShow, setModalShow] = useState(false)
  const [errModalShow, setErrModalShow] = useState(false)

  const handleClick = () => {
    if (
      application.pending.length
        ? application.pending.length
        : application.reverted.length
    ) {
      setErrModalShow(true)
    } else {
      setModalShow(true)
    }
  }

  const closeModal = () => setModalShow(false)
  const closeErrModal = () => setErrModalShow(false)

  useEffect(() => {
    setLoading(true)
    let mounted = true
    getAllApplications(mounted)
    setLoading(false)
    return () => {
      setLoading(false)
      mounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <section className="profile-main">
      <ProfileTitle
        modalShow={modalShow}
        errModalShow={errModalShow}
        handleClick={handleClick}
        closeModal={closeModal}
        closeErrModal={closeErrModal}
        submitApplication={submitApplication}
      />
      <Row>
        <Col sm={12} lg={6}>
          <PendingTable
            title="Pending Applications"
            allApplications={
              application.pending.length
                ? application.pending
                : application.reverted
            }
            loading={loading}
          />
        </Col>
        <Col sm={12} lg={6}>
          <ProfileInfo loading={loading} />
        </Col>
      </Row>
      <Row>
        <Col sm={12} lg={6}>
          <ProfileTable
            extraClassName="approved"
            title="Approved Applications"
            allApplications={application.approved}
            loading={loading}
          />
        </Col>
        <Col sm={12} lg={6}>
          <ProfileTable
            extraClassName="rejected"
            title="Rejected Applications"
            allApplications={application.rejected}
            loading={loading}
          />
        </Col>
      </Row>
    </section>
  )
}

ProfileMain.propTypes = {
  getAllApplications: PropTypes.func.isRequired,
  submitApplication: PropTypes.func.isRequired
}

const mapStateToProps = ({ application }) => ({
  application: application
})

export default connect(mapStateToProps, {
  getAllApplications,
  submitApplication
})(ProfileMain)
