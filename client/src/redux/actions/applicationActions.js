import axios from 'axios'
import store from '../../store'
import { ApplicationActionTypes } from '../types'
import { toast } from 'react-toastify'
import download from 'downloadjs'

const token = localStorage.getItem('jwtToken')
const adminToken = localStorage.getItem('adminToken')
const currUser = store.getState().user
const currAdmin = store.getState().admin

// Get all applications api call
export const getAllApplications = (mounted) => (dispatch) => {
  const currUser = store.getState().user
  axios
    .get('/api/v1/applications', {
      headers: { Authorization: `Bearer ${token}` },
      params: { type: currUser.type || 'iitism', userId: currUser.userId }
    })
    .then((res) => {
      if (mounted) {
        dispatch(setAllApplications(res.data))
      }
    })
    .catch((err) => {
      setTimeout(
        () =>
          toast.error(err.response.data.message + ' 🤥', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          }),
        300
      )
    })
}

// Submit an Application api call
export const submitApplication = (appData, callback) => (dispatch) => {
  axios
    .post('/api/v1/applications', appData, {
      headers: { Authorization: `Bearer ${token}` },
      params: { type: currUser.type }
    })
    .then((res) => {
      setTimeout(() => {
        toast.success('Application Submitted Successfully! 😄', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        })
        setTimeout(() => window.location.reload(), 2100)
      }, 3500)
      callback()
    })
    .catch((err) => {
      toast.error(err.response.data.message + ' 🙁', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
      callback()
    })
}

// Submit a valid profile id card
export const uploadIdCard = (data, callback) => (dispatch) => {
  axios
    .put(`/api/v1/applicants/${currUser.userId}/avatar`, data, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      toast.success('Id Uploaded Successfully! 😄', {
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
      toast.error(err.response.data.message + ' 🙁', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
      callback()
    })
}

// Submit a valid profile signature
export const uploadSign = (data, callback, admin) => (dispatch) => {
  axios
    .put(
      `/api/v1/applicants/${
        admin ? currAdmin.adminId : currUser.userId
      }/signature`,
      data,
      {
        headers: { Authorization: `Bearer ${admin ? adminToken : token}` }
      }
    )
    .then((res) => {
      toast.success('Signature Uploaded Successfully! 😄', {
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
      toast.error(err.response.data.message + ' 🙁', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
      callback()
    })
}

// get applicant file details
export const getApplicantPitchFile = (id, callback, name) => (dispatch) => {
  axios
    .get(`/api/v1/applications/${id}/document`, {
      headers: { Authorization: `Bearer ${adminToken}` },
      responseType: 'blob'
    })
    .then((response) => {
      const content = response.headers['content-type']
      download(response.data, name + 'PitchFile', content)
      callback()
    })
    .catch((err) => {
      toast.error(err.response.data.message + ' 🙁', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
      callback()
    })
}

// Set All Applications
export const setAllApplications = (data) => {
  return {
    type: ApplicationActionTypes.GET_ALL_APPLICATIONS,
    payload: data
  }
}

// Make an application
export const setCurrentApplication = (data) => {
  return {
    type: ApplicationActionTypes.MAKE_APPLICATION,
    payload: data
  }
}

// Set Current Applicant File
export const setCurrentPitchFile = (data) => {
  return {
    type: ApplicationActionTypes.SET_CURRENT_FILE,
    payload: data
  }
}
