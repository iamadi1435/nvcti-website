import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/logo/nvcti-transparent-no-text.png'
import { Navbar, Nav, Modal, Form } from 'react-bootstrap'
import { Fade } from 'react-reveal'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logoutUser } from '../../redux/actions/authActions'
import {
  uploadIdCard,
  uploadSign
} from '../../redux/actions/applicationActions'
import Loader from '../common/loader'

const ProfileHeader = ({ logoutUser, uploadIdCard, uploadSign }) => {
  const handleLogout = (e) => {
    e.preventDefault()
    logoutUser()
    window.location.pathname = '/'
  }
  const [isOpen, setIsOpen] = useState(false)
  const [signModal, setSignModal] = useState(false)
  const [idModal, setIdModal] = useState(false)
  const [idUploadPending, setIdUploadPending] = useState(false)
  const [signUploadPending, setSignUploadPending] = useState(false)

  const [idCard, setIdCard] = useState()
  const [sign, setSign] = useState()

  const OpenSignModal = () => setSignModal(true)
  const CloseSignModal = () => setSignModal(false)

  const OpenIdModal = () => setIdModal(true)
  const CloseIdModal = () => setIdModal(false)

  const handleTogglerClick = () => {
    let header = document.getElementsByClassName('profile-nav')[0]
    if (isOpen) {
      setTimeout(() => {
        header.style.height = 'fit-content'
      }, 500)
      setIsOpen(false)
    } else {
      setIsOpen(true)
    }
  }
  const handleSignUpload = (e) => setSign(e.target.files[0])
  const handleIdUpload = (e) => setIdCard(e.target.files[0])

  const IdCallback = () => {
    setIdUploadPending(false)
    setIdCard('')
    setIdModal(false);
  }

  const SignCallback = () => {
    setSignUploadPending(false)
    setSign('')
    setSignModal(false);
  }

  const handleSubmitId = (e) => {
    e.preventDefault()
    setIdUploadPending(true)
    const formData = new FormData()
    if (typeof idCard !== 'undefined') {
      formData.append('avatar', idCard, idCard.name)
    }
    uploadIdCard(formData, IdCallback)
  }

  const handleSubmitSign = (e) => {
    e.preventDefault()
    setSignUploadPending(true)
    const formData = new FormData()
    if (typeof sign !== 'undefined') {
      formData.append('signature', sign, sign.name)
    }
    uploadSign(formData, SignCallback)
  }

  return (
    <>
      <Navbar className="profile-nav" fixed="top" collapseOnSelect expand="lg">
        <Fade left cascade>
          <Link to="/" className="brand-name ml-5 navbar-brand">
            <img
              src={Logo}
              width="auto"
              height="50"
              className="d-inline-block align-top"
              alt="logo"
            />
          </Link>
        </Fade>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={handleTogglerClick}
          style={{ height: 'fit-content' }}
        />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="logoutNav"
          style={{ justifyContent: 'flex-end' }}>
          <Fade>
            <Nav className="mr-5">
              <div className="mr-3">
                <button
                  className="styleme"
                  style={{ padding: '5px 10px' }}
                  onClick={OpenIdModal}>
                  Upload ID
                </button>
              </div>
              <div className="mr-3">
                <button
                  className="styleme"
                  style={{ padding: '5px 10px' }}
                  onClick={OpenSignModal}>
                  Upload Signature
                </button>
              </div>
              <button
                className="styleme"
                style={{ padding: '5px 10px' }}
                onClick={handleLogout}>
                Logout
              </button>
            </Nav>
          </Fade>
        </Navbar.Collapse>
      </Navbar>
      {/* ID Upload Modal */}
      <Modal
        show={idModal}
        onHide={CloseIdModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Upload Valid ID
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmitId}>
            <Form.Group>
              <Form.File
                id="idCard"
                onChange={handleIdUpload}
                required
                accept="image/*"
              />
            </Form.Group>
            <button
              type="submit"
              className="styleme"
              style={{ padding: '6px 15px', marginTop: '10px' }}>
              {idUploadPending ? <Loader variant="light" /> : 'Submit'}
            </button>
          </form>
        </Modal.Body>
      </Modal>
      {/* Signature Upload Modal */}
      <Modal
        show={signModal}
        onHide={CloseSignModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Upload Signature
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmitSign}>
            <Form.Group>
              <Form.File
                id="sign"
                onChange={handleSignUpload}
                required
                accept="image/*"
              />
            </Form.Group>
            <button
              type="submit"
              className="styleme"
              style={{ padding: '6px 15px', marginTop: '10px' }}>
              {signUploadPending ? <Loader variant="light" /> : 'Submit'}
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}

ProfileHeader.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  uploadIdCard: PropTypes.func.isRequired
}

export default connect(null, { logoutUser, uploadIdCard, uploadSign })(
  ProfileHeader
)
