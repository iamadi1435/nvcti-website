import { faUnlockAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Form, FormControl, InputGroup, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Fade } from 'react-reveal'
import { loginUser } from '../../redux/actions/authActions'
import Loader from '../common/loader'

const IITISMLogin = ({ loginUser }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const resetForm = () => {
    setEmail('')
    setPassword('')
  }

  const callback = () => {
    setTimeout(() => {
      resetForm()
      setLoading(false)
    }, 2000)
  }

  const checkDisabled = () => {
    if (email && password) {
      return true
    } else {
      return false
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    const userData = {
      email,
      password
    }
    loginUser(userData, 'iitism', callback)
  }

  return (
    <section className="login-form-section justify-align-center">
      <Fade>
        <h2>Internal Applicants</h2>

        <form onSubmit={handleSubmit}>
          {' '}
          <Form.Group as={Row} className="mt-3">
            <Form.Label htmlFor="inlineFormInputGroup1" srOnly>
              Username
            </Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faUserCircle} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                id="inlineFormInputGroup1"
                placeholder="Email"
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label htmlFor="inlineFormInputGroup2" srOnly>
              Password
            </Form.Label>
            <InputGroup className="mb-2">
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faUnlockAlt} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                id="inlineFormInputGroup2"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group as={Row} className="justify-center">
            <button type="submit" disabled={!checkDisabled()}>
              {loading ? <Loader variant="light" /> : 'Log In'}
            </button>
          </Form.Group>
        </form>
      </Fade>
    </section>
  )
}

IITISMLogin.propTypes = {
  loginUser: PropTypes.func.isRequired
}

export default connect(null, { loginUser })(IITISMLogin)
