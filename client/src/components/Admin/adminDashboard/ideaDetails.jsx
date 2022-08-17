import React, { useEffect, useState } from 'react'
import {
  Card,
  Row,
  Form,
  FormControl,
  Col,
  InputGroup,
  Button
} from 'react-bootstrap'
import AdminHeader from './header'
import { useParams, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPenSquare,
  faInfoCircle,
  faEye,
  faDownload
} from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import Loader from '../../common/loader'
import { Fade } from 'react-reveal'
import PropTypes from 'prop-types'
import axios from 'axios'
import { toast } from 'react-toastify'
import { connect } from 'react-redux'
import {
  getApplicantDetailById,
  downloadPdf
} from '../../../redux/actions/adminActions'
import { getApplicantPitchFile } from '../../../redux/actions/applicationActions'

const IdeaDetails = ({
  applicationData,
  getApplicantDetailById,
  getApplicantPitchFile,
  downloadPdf
}) => {
  const { id, type, appId, title } = useParams()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({})
  const [userData, setUserData] = useState({})
  const [ideaDetails, setIdeaDetails] = useState('')
  useEffect(() => {
    document.title = 'Details | NVCTI'
    document.body.style.backgroundColor = '#eef5f9'
    setLoading(true)
    setIdeaDetails(localStorage.getItem('currentIdea'))
    let mounted = true
    getApplicantDetailById(mounted, id, type, appId, () => setLoading(false))
    return () => {
      document.body.style.backgroundColor = null
      mounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setData(applicationData)
    if (applicationData.hasOwnProperty('iitism_applicant')) {
      setUserData(applicationData.iitism_applicant)
    } else {
      setUserData(applicationData.external_applicant)
    }
  }, [applicationData])

  const [appData, setAppData] = useState({
    remarks: '',
    applicationVerdict: 'APPROVED'
  })

  const [loading2, setLoading2] = useState(false)
  const [downloadPending, setDownloadPending] = useState(false)
  const [pitchFilePending, setPitchFilePending] = useState(false)

  const downloadCallback = () => {
    setDownloadPending(false)
  }

  const handleDownloadPdf = () => {
    setDownloadPending(true)
    downloadPdf(data.id, userData.name, downloadCallback)
  }

  const callback = () => {
    setLoading2(false)
    setAppData({ remarks: '', applicationVerdict: '' })
  }

  const checkDisabled = () => {
    if (appData.applicationVerdict) {
      return true
    }
    return false
  }

  const handleGetPitchFile = (id) => {
    setPitchFilePending(true)
    getApplicantPitchFile(id, () => setPitchFilePending(false), userData.name)
  }

  const handleSubmit = (e) => {
    setLoading2(true)
    e.preventDefault()
    const token = localStorage.getItem('adminToken')
    axios
      .patch(`/api/v1/applications/${appId}`, appData, {
        headers: { Authorization: `Bearer ${token}` },
        params: { appId: appId }
      })
      .then((res) => {
        toast.success('Application Status Changed Successfully 😄', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        })
        callback()
      })
      .catch((err) => {
        callback()
        toast.error(err.response.data.message + ' 🙁', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        })
      })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setAppData({ ...appData, [name]: value })
  }

  return (
    <>
      <AdminHeader />
      <section className="admin-main justify-align-center">
        <Card className="idea_card">
          <Card.Body>
            <Card.Title>
              Applicant's Details{' '}
              <span className="ml-3">
                <FontAwesomeIcon style={{ color: '#02B5B8' }} icon={faUser} />
              </span>
            </Card.Title>
            <Fade>
              {loading ? (
                <Card.Text as={Col}>
                  <div
                    style={{ marginTop: '40px', marginBottom: '20px' }}
                    className="justify-align-center">
                    <Loader
                      variant="dark"
                      message="Getting Student's Details...."
                      extraStyle={{ fontSize: '20px' }}
                    />
                  </div>
                </Card.Text>
              ) : (
                <Card.Text as={Col}>
                  {loading ? (
                    <div
                      style={{ marginTop: '40px', marginBottom: '20px' }}
                      className="justify-align-center">
                      <Loader
                        variant="dark"
                        message="Getting Student's Details...."
                        extraStyle={{ fontSize: '20px' }}
                      />
                    </div>
                  ) : typeof data !== 'undefined' ? (
                    <>
                      {' '}
                      {data.applicationCategory && (
                        <p>Application Category: {data.applicationCategory}</p>
                      )}
                      {data.nvtilUnit && <p>NVTIL Unit: {data.nvtilUnit}</p>}
                      {typeof userData !== 'undefined' && userData && (
                        <>
                          <p>Name: {userData.name}</p>
                          {userData.admissionNumber && (
                            <p>Admission Number: {userData.admissionNumber}</p>
                          )}
                          <p>
                            Deparment/Institute:{' '}
                            {userData.instituteName || 'IIT (ISM) Dhanbad'}
                          </p>
                          <p>Gender: {userData.gender}</p>
                          <p>Email: {userData.email}</p>
                          {userData.contactNumber && (
                            <p>Contact Number: {userData.contactNumber}</p>
                          )}
                          {userData.permanentAddress && (
                            <p>Address: {userData.permanentAddress}</p>
                          )}
                        </>
                      )}
                      <p>Title of the Project/Idea: {ideaDetails}</p>
                      {data.objectiveOfProject && (
                        <p>
                          Objective of Project/Idea: {data.objectiveOfProject}
                        </p>
                      )}
                      {data.nameOfMentor && data.nameOfMentor !== 'null' && (
                        <p>Name of Mentor: {data.nameOfMentor}</p>
                      )}
                      {data.sourceOfFunding && (
                        <p>Source of Funding: {data.sourceOfFunding}</p>
                      )}
                      {data.numberOfMembers && (
                        <p>Number of Members: {data.numberOfMembers}</p>
                      )}
                      <Button
                        style={{ width: 'fit-content', marginBottom: '7px' }}
                        variant="dark"
                        onClick={() => handleGetPitchFile(data.id)}
                        disabled={pitchFilePending}>
                        {pitchFilePending ? (
                          <div style={{ margin: '0 40px' }}>
                            <Loader variant="light" />
                          </div>
                        ) : (
                          <p className="mb-0">
                            View Pitch File{' '}
                            <FontAwesomeIcon
                              icon={faEye}
                              style={{ marginLeft: '5px' }}
                            />
                          </p>
                        )}
                      </Button>
                      {title === 'Accepted Applications' ? (
                        <Button
                          style={{ width: 'fit-content', marginBottom: '7px', marginLeft: '10px' }}
                          variant="dark"
                          onClick={handleDownloadPdf}
                          disabled={downloadPending}>
                          {downloadPending ? (
                            <div style={{ margin: '0 30px' }}>
                              <Loader variant="light" />
                            </div>
                          ) : (
                            <p className="mb-0">
                              Download PDF{' '}
                              <FontAwesomeIcon
                                icon={faDownload}
                                style={{ marginLeft: '5px' }}
                              />
                            </p>
                          )}
                        </Button>
                      ) : null}
                      {title === 'Pending Applications' && (
                        <form onSubmit={handleSubmit}>
                          <Form.Group
                            style={{ marginLeft: '1px', marginTop: '5px' }}
                            as={Row}
                            controlId="remarks">
                            <InputGroup>
                              <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">
                                  <FontAwesomeIcon
                                    icon={faPenSquare}></FontAwesomeIcon>
                                </InputGroup.Text>
                              </InputGroup.Prepend>
                              <Form.Control
                                placeholder="Write Remarks here"
                                aria-label="remarks"
                                aria-describedby="basic-addon1"
                                name="remarks"
                                onChange={handleChange}
                                value={appData.remarks}
                                type="text"
                              />
                            </InputGroup>
                          </Form.Group>
                          <Form.Group
                            style={{ marginLeft: '1px' }}
                            as={Row}
                            controlId="applicationVerdict">
                            <Form.Label>Verdict</Form.Label>
                            <InputGroup>
                              <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">
                                  <FontAwesomeIcon
                                    icon={faInfoCircle}></FontAwesomeIcon>
                                </InputGroup.Text>
                              </InputGroup.Prepend>
                              <FormControl
                                as="select"
                                required={true}
                                custom={true}
                                value={appData.applicationVerdict}
                                name="applicationVerdict"
                                onChange={handleChange}>
                                <option value="APPROVED">Approved</option>
                                <option value="REJECTED">Rejected</option>
                                <option value="REVERTED">Reverted</option>
                              </FormControl>
                            </InputGroup>
                          </Form.Group>
                          <Form.Group as={Row}>
                            <Col>
                              <button
                                className="styleme"
                                style={{
                                  flexDirection: 'row',
                                  padding: '8px 15px'
                                }}
                                type="submit"
                                disabled={!checkDisabled()}>
                                {loading2 ? (
                                  <Loader variant="light" />
                                ) : (
                                  'Submit'
                                )}
                              </button>
                            </Col>
                          </Form.Group>

                          <Form.Group as={Row}>
                            <Col>
                              <Link to="/admin_dashboard">
                                <button
                                  className="styleme"
                                  style={{
                                    flexDirection: 'row',
                                    padding: '8px 15px'
                                  }}
                                  disabled={loading2}>
                                  Go to dashboard
                                </button>
                              </Link>
                            </Col>
                          </Form.Group>
                        </form>
                      )}
                    </>
                  ) : null}
                </Card.Text>
              )}
            </Fade>
          </Card.Body>
        </Card>
      </section>
    </>
  )
}

IdeaDetails.propTypes = {
  getApplicantDetailById: PropTypes.func.isRequired,
  getApplicantPitchFile: PropTypes.func.isRequired,
  downloadPdf: PropTypes.func.isRequired
}

const mapStateToProps = ({ admin }) => ({
  applicationData: admin.currentApplication
})
export default connect(mapStateToProps, {
  downloadPdf,
  getApplicantDetailById,
  getApplicantPitchFile
})(IdeaDetails)
