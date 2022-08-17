import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../assets/logo/nvcti-white.png";
import { uploadSign } from '../../../redux/actions/applicationActions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Navbar, Modal, Form, Button, Nav} from 'react-bootstrap'
import Loader from '../../common/loader'
import { Fade } from "react-reveal";

const AdminHeader = ({ uploadSign }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [sign, setSign] = useState()
  const [signModal, setSignModal] = useState(false)
  const [signUploadPending, setSignUploadPending] = useState(false)

  const OpenSignModal = () => setSignModal(true)
  const CloseSignModal = () => setSignModal(false)

  const handleSignUpload = (e) => setSign(e.target.files[0])

  const SignCallback = () => {
    setSignUploadPending(false)
    setSign('')
    setSignModal(false)
  }

  const handleSubmitSign = (e) => {
    e.preventDefault()
    setSignUploadPending(true)
    const formData = new FormData()
    if (typeof sign !== 'undefined') {
      formData.append('signature', sign, sign.name)
    }
    uploadSign(formData, SignCallback, true)
  }

  return (
    <Navbar
      className="admin-nav"
      collapseOnSelect
      expand="lg"
      bg="primary"
      variant="dark">
      <Navbar.Brand href="#home">
        <Fade>
          <Link to="/" className="brand-name ml-2 navbar-brand">
            <img
              src={Logo}
              width="auto"
              height="50"
              className="d-inline-block align-top"
              alt="logo"
            />
          </Link>
        </Fade>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse
        id="responsive-navbar-nav"
        className="justify-content-end admin_header">
        <Nav>
          <Fade>
            <Button
              variant="light"
              style={{ width: 'fit-content' }}
              onClick={OpenSignModal}>
              Upload Signature
            </Button>
          </Fade>
        </Nav>
      </Navbar.Collapse>
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
    </Navbar>
  )
}

AdminHeader.propTypes = {
  uploadSign: PropTypes.func.isRequired
}

export default connect(null, { uploadSign })(AdminHeader)
