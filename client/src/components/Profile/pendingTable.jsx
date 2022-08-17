import React, { useState } from 'react'
import { Card, Table } from 'react-bootstrap'
import { Fade } from 'react-reveal'
import Loader from '../common/loader'
import IdeaSubmissionModal from './ideaSubmissionModal'
import axios from 'axios'
import { toast } from 'react-toastify'

const PendingItem = ({ item, edit, handleSetDetails, openModal }) => {
  const manipulateDate = (date) => {
    let str = new Date(date).toDateString()
    return str.substr(4)
  }
  const handleClick = (item) => {
    handleSetDetails(item)
    openModal()
  }
  return (
    <tr>
      <td>{item.titleOfProject}</td>
      <td>{manipulateDate(item.created_at)}</td>
      <td style={{ textTransform: 'capitalize' }}>{item.applicationVerdict}</td>
      {edit && (
        <td>
          <button
            className="styleme"
            style={{ padding: '5px 9px', textTransform: 'capitalize' }}
            onClick={() => handleClick(item)}>
            Edit
          </button>
        </td>
      )}
    </tr>
  )
}

const PendingTable = ({ title, allApplications, loading }) => {
  const [show, setShow] = useState(false)
  const [details, setDetails] = useState({})
  const openModal = () => setShow(true)
  const closeModal = () => setShow(false)
  const handleSetDetails = (data) => setDetails(data)

  const updateApplication = async (formData, callback, data) => {
    console.log("data", data)
    const token = localStorage.getItem('jwtToken')
    await axios
      .patch(`/api/v1/applications/${data.id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
        params: { appId: data.id, type: data.user }
      })
      .then((res) => {
        callback()
        toast.success('Application Updated Successfully 😄', {
          position: 'top-right',
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        })
        // setTimeout(() => {
        //   window.location.reload()
        // }, 2500)
      })
      .catch((err) => {
        callback()
        setTimeout(() => {
          toast.error(err.response.data.message + ' 🙁', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          })
        }, 500)
      })
  }
  return (
    <Card className="profile-table mb-3">
      <Fade>
        <Card.Title className="align-center pending">{title}</Card.Title>
      </Fade>
      {loading ? (
        <div
          style={{ marginTop: '40px', marginBottom: '20px' }}
          className="justify-align-center">
          <Loader
            variant="dark"
            message="Hold on a little 😃, we're getting the information!"
            extraStyle={{ fontSize: '20px' }}
          />
        </div>
      ) : typeof allApplications === 'undefined' ||
        allApplications.length === 0 ||
        !allApplications ? (
        <div
          style={{ marginTop: '40px', marginBottom: '20px' }}
          className="justify-align-center">
          <p>No {title}, Yay!!</p>
        </div>
      ) : (
        <>
          <Fade>
            {allApplications[0].applicationVerdict !== 'REVERTED' ? (
              <Table striped borderless hover>
                <colgroup>
                  <col span="1" style={{ width: '50%' }} />
                  <col span="1" style={{ width: '30%' }} />
                  <col span="1" style={{ width: '32%' }} />
                </colgroup>
                <thead>
                  <tr>
                    <th>Proposed Idea</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {allApplications.map((item, ind) => {
                    return <PendingItem key={ind + item} item={item} />
                  })}
                </tbody>
              </Table>
            ) : (
              <Table striped borderless hover>
                <colgroup>
                  <col span="1" style={{ width: '40%' }} />
                  <col span="1" style={{ width: '20%' }} />
                  <col span="1" style={{ width: '20%' }} />
                  <col span="1" style={{ width: '20%' }} />
                </colgroup>
                <thead>
                  <tr>
                    <th>Proposed Idea</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>More</th>
                  </tr>
                </thead>
                <tbody style={{ cursor: 'pointer' }}>
                  {allApplications.map((item, ind) => {
                    return (
                      <PendingItem
                        key={ind + item}
                        item={item}
                        edit
                        openModal={openModal}
                        handleSetDetails={handleSetDetails}
                      />
                    )
                  })}
                </tbody>
              </Table>
            )}
          </Fade>
          <IdeaSubmissionModal
            show={show}
            submitApplication={updateApplication}
            editDetails={true}
            details={details}
            onHide={closeModal}
          />
        </>
      )}
    </Card>
  )
}

export default PendingTable
