import * as icons from '@fortawesome/free-solid-svg-icons'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  InputGroup,
  Modal,
  Row
} from 'react-bootstrap'
import { Fade } from 'react-reveal'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { registerUser } from '../../redux/actions/authActions'
import Loader from '../../components/common/loader'

const NameInput = (props) => {
  return (
    <InputGroup className="mb-3">
      <InputGroup.Prepend>
        <InputGroup.Text id="basic-addon1">
          <FontAwesomeIcon
            icon={props.prepend || faInfoCircle}></FontAwesomeIcon>
        </InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl
        placeholder={props.placeholder || ''}
        aria-label="Username"
        aria-describedby="basic-addon1"
        name={props.name}
        onChange={props.handleChange}
        value={props.data[props.name] || ''}
        type={props.type || 'text'}
        required={props.required}
      />
    </InputGroup>
  )
}

const GenderInput = (props) => {
  return (
    <FormGroup controlId="gender">
      <Form.Label>Gender</Form.Label>
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">
            <FontAwesomeIcon icon={icons.faUserAstronaut}></FontAwesomeIcon>
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          as="select"
          required={props.required}
          custom={true}
          value={props.data[props.name]}
          name="gender"
          onChange={props.handleChange}>
          <option value="MALE">MALE</option>
          <option value="FEMALE">FEMALE</option>
          <option value="NON-BINARY">NON-BINARY</option>
          <option value="UNSPECIFIED">UNSPECIFIED</option>
        </FormControl>
      </InputGroup>
    </FormGroup>
  )
}

const HostelInput = (props) => {
  return (
    <FormGroup controlId="hostel">
      <Form.Label>Hostel</Form.Label>
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">
            <FontAwesomeIcon icon={icons.faHospitalAlt}></FontAwesomeIcon>
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          as="select"
          required={props.required}
          custom={true}
          value={props.data[props.name]}
          name="hostel"
          onChange={props.handleChange}>
          <option value="0" disabled>
            Select Hostel
          </option>
          <option value="Amber">Amber</option>
          <option value="Jasper">Jasper</option>
          <option value="Sapphire">Sapphire</option>
          <option value="Diamond">Diamond</option>
          <option value="Rosaline">Rosaline</option>
          <option value="Ruby">Ruby</option>
          <option value="Topaz">Topaz</option>
          <option value="Opal">Opal</option>
          <option value="Others">Other</option>
        </FormControl>
      </InputGroup>
    </FormGroup>
  )
}

const TypeInput = (props) => {
  return (
    <FormGroup controlId="hostel">
      <Form.Label>User Type</Form.Label>
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">
            <FontAwesomeIcon icon={icons.faUserAlt}></FontAwesomeIcon>
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          as="select"
          required={props.required}
          custom={true}
          value={props.data[props.name]}
          name="role"
          onChange={props.handleChange}>
          <option value="0" disabled>
            Select User Type
          </option>
          <option value="Student">Student</option>
          <option value="Faculty">Faculty</option>
          <option value="Staff">Staff</option>
        </FormControl>
      </InputGroup>
    </FormGroup>
  )
}

const DateInput = (props) => {
  return (
    <FormGroup>
      <Form.Label>Date of Birth</Form.Label>
      <FormControl
        as="input"
        name={props.name || 'dateOfBirth'}
        value={props.data[props.name]}
        placeholder={props.placeholder || 'DOB'}
        required={props.required}
        type="date"
        onChange={props.handleChange}
        style={{ border: '1px solid lightgrey' }}
      />
    </FormGroup>
  )
}

const FormFields = ({ formToggle, data, handleChange, enabledForStudent }) => {
  if (formToggle === 'IITISM') {
    return (
      <div className="clearfix">
        <NameInput
          name="name"
          placeholder="NAME"
          handleChange={handleChange}
          data={data}
          prepend={icons.faUserAlt}
          required={true}
        />
        <TypeInput data={data} handleChange={handleChange} required={true} />
        <NameInput
          name="email"
          placeholder="EMAIL ADDRESS"
          handleChange={handleChange}
          data={data}
          prepend={icons.faMailBulk}
          type="email"
          required={true}
        />
        <NameInput
          name="password"
          placeholder="PASSWORD"
          handleChange={handleChange}
          data={data}
          prepend={icons.faUnlockAlt}
          type="password"
          required={true}
        />
        {data.role === 'Student' ? (
          <>
            <NameInput
              name="admissionNumber"
              placeholder="ADMISSION NUMBER"
              handleChange={handleChange}
              data={data}
              prepend={icons.faIdCard}
              required={true}
            />
            <NameInput
              name="course"
              placeholder="COURSE"
              handleChange={handleChange}
              data={data}
              prepend={icons.faBookReader}
              required={true}
            />
            <NameInput
              name="branch"
              placeholder="BRANCH"
              handleChange={handleChange}
              data={data}
              prepend={icons.faLaptop}
              required={true}
            />
          </>
        ) : null}
        <NameInput
          name="permanentAddress"
          placeholder="PERMANENT ADDRESS"
          handleChange={handleChange}
          data={data}
          prepend={icons.faHome}
          required={true}
        />
        <NameInput
          name="contactNumber"
          placeholder="PHONE NUMBER"
          handleChange={handleChange}
          data={data}
          prepend={icons.faPhone}
          type="number"
          required={true}
        />
        <HostelInput data={data} handleChange={handleChange} required={true} />
        <GenderInput data={data} handleChange={handleChange} required={true} />
        <DateInput
          name="dateOfBirth"
          data={data}
          handleChange={handleChange}
          required={true}
        />
      </div>
    )
  } else {
    return (
      <div className="clearfix">
        <NameInput
          name="name"
          placeholder="NAME"
          handleChange={handleChange}
          data={data}
          prepend={icons.faUserAlt}
          required={true}
        />
        <NameInput
          name="email"
          placeholder="EMAIL ADDRESS"
          handleChange={handleChange}
          data={data}
          prepend={icons.faMailBulk}
          type="email"
          required={true}
        />
        <NameInput
          name="password"
          placeholder="PASSWORD"
          handleChange={handleChange}
          data={data}
          prepend={icons.faUnlockAlt}
          type="password"
          required={true}
        />
        <NameInput
          name="instituteName"
          placeholder="INSTITUTE"
          handleChange={handleChange}
          data={data}
          prepend={icons.faLaptop}
          required={true}
        />
        <NameInput
          name="course"
          placeholder="COURSE"
          handleChange={handleChange}
          data={data}
          prepend={icons.faBookReader}
          required={true}
        />
        <NameInput
          name="branch"
          placeholder="BRANCH"
          handleChange={handleChange}
          data={data}
          prepend={icons.faLaptop}
          required={true}
        />
        <NameInput
          name="permanentAddress"
          placeholder="PERMANENT ADDRESS"
          handleChange={handleChange}
          data={data}
          prepend={icons.faHome}
          required={true}
        />
        <NameInput
          name="contactNumber"
          placeholder="PHONE NUMBER"
          handleChange={handleChange}
          data={data}
          prepend={icons.faPhone}
          type="number"
          required={true}
        />
        <GenderInput data={data} handleChange={handleChange} required={true} />
        <DateInput
          name="dateOfBirth"
          data={data}
          handleChange={handleChange}
          required={true}
        />
      </div>
    )
  }
}

const IITISMForm = ({ registerUser, onHide }) => {
  const [data, setData] = useState({
    name: '',
    role: 'Student',
    email: '',
    password: '',
    admissionNumber: '',
    branch: '',
    course: '',
    hostel: 'Amber',
    contactNumber: '',
    permanentAddress: '',
    dateOfBirth: '',
    gender: 'MALE'
  })

  const [loading, setLoading] = useState(false)

  const resetForm = () => {
    setData({
      name: '',
      role: 'Student',
      email: '',
      password: '',
      branch: '',
      course: '',
      contactNumber: '',
      instituteName: '',
      permanentAddress: '',
      dateOfBirth: '',
      gender: ''
    })
  }

  const checkDisabled = () => {
    const {
      name,
      email,
      password,
      contactNumber,
      permanentAddress,
      dateOfBirth,
      gender,
      role
    } = data
    if (
      name &&
      email &&
      password &&
      contactNumber &&
      permanentAddress &&
      dateOfBirth &&
      gender &&
      role
    ) {
      return true
    } else {
      return false
    }
  }

  const callback = () => {
    setLoading(false)
    resetForm()
    onHide()
  }

  const handleSubmit = (e) => {
    setLoading(true)
    e.preventDefault()
    registerUser(data, 'iitism', callback)
  }
  const handleChange = (e) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="registration-form"
        id="registration-form">
        <Fade>
          <FormFields
            data={data}
            handleChange={handleChange}
            formToggle="IITISM"
          />
          <br />
          <Col md={12} lg={12} sm={12} xs={12}>
            <Button variant="success" type="submit" disabled={!checkDisabled()}>
              {loading ? <Loader variant="light" /> : 'Submit'}
            </Button>
          </Col>
        </Fade>
      </form>
    </>
  )
}

const OtherForm = ({ registerUser, onHide }) => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    branch: '',
    course: '',
    contactNumber: '',
    instituteName: '',
    permanentAddress: '',
    dateOfBirth: '',
    gender: 'MALE'
  })

  const [loading, setLoading] = useState(false)

  const resetForm = () => {
    setData({
      name: '',
      email: '',
      password: '',
      branch: '',
      course: '',
      contactNumber: '',
      instituteName: '',
      permanentAddress: '',
      dateOfBirth: '',
      gender: ''
    })
  }

  const callback = () => {
    setLoading(false)
    resetForm()
    onHide()
  }

  const handleSubmit = (e) => {
    setLoading(true)
    e.preventDefault()
    registerUser(data, 'external', callback)
  }

  const checkDisabled = () => {
    const {
      name,
      email,
      password,
      branch,
      course,
      instituteName,
      contactNumber,
      permanentAddress,
      dateOfBirth,
      gender
    } = data
    if (
      name &&
      email &&
      password &&
      instituteName &&
      branch &&
      course &&
      contactNumber &&
      permanentAddress &&
      dateOfBirth &&
      gender
    ) {
      return true
    } else {
      return false
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="registration-form"
      id="registration-form">
      <Fade>
        <FormFields
          data={data}
          handleChange={handleChange}
          formToggle="OTHERS"
        />
        <br />
        <Col md={12} lg={12} sm={12} xs={12}>
          <Button variant="success" type="submit" disabled={!checkDisabled()}>
            {loading ? <Loader variant="light" /> : 'Submit'}
          </Button>
        </Col>
      </Fade>
    </form>
  )
}

const PopUpForm = (props) => {
  return (
    <>
      <Modal
        show={props.show}
        onHide={props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.formToggle === 'IITISM' ? 'Internal ' : 'External '}{' '}
            Applicants
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Fade>
            <div className="section-title center-xs">
              <div className="sm-top-bottom40">
                <h4>Registration</h4>
              </div>
              {props.formToggle === 'IITISM' ? (
                <Fade>
                  <IITISMForm
                    registerUser={props.registerUser}
                    onHide={props.onHide}
                  />
                </Fade>
              ) : (
                <Fade>
                  <OtherForm
                    registerUser={props.registerUser}
                    onHide={props.onHide}
                  />
                </Fade>
              )}
            </div>
          </Fade>
        </Modal.Body>
        <Modal.Footer>
          <Row>
            <Col md={12} lg={12} sm={12} xs={12}>
              <div className="form-tip">
                <FontAwesomeIcon icon={faInfoCircle} className="pr-1" />
                All fields are required
              </div>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
    </>
  )
}

PopUpForm.propTypes = {
  registerUser: PropTypes.func.isRequired
}

export default connect(null, { registerUser })(PopUpForm)
