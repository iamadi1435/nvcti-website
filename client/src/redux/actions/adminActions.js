import axios from 'axios'
import { AdminActionTypes } from '../types'
import jwt_decode from 'jwt-decode'
import { toast } from 'react-toastify'
import download from 'downloadjs'

export const getCurrentIdea = (idea) => (dispatch) => {
  dispatch(setCurrentIdea(idea))
}

export const getApplicantDetailById =
  (mounted, id, user, appId, callback) => (dispatch) => {
    const token = localStorage.getItem('adminToken')
    axios
      .get(`/api/v1/applications/${appId}`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { type: user, id: id }
      })
      .then((res) => {
        if (mounted) {
          dispatch(setCurrentApplication(res.data))
          callback()
        }
      })
      .catch((err) => {
        setTimeout(
          () =>
            toast.error('User not found 🤥', {
              position: 'top-right',
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined
            }),
          300
        )
        callback()
      })
  }

// export const changeApplicationStatus = (appData,appId,callback) => {

// }

export const getAllExternalUserApplications = (mounted) => (dispatch) => {
  const token = localStorage.getItem('adminToken')
  axios
    .get('/api/v1/applications', {
      headers: { Authorization: `Bearer ${token}` },
      params: { type: 'external' }
    })
    .then((res) => {
      if (mounted) {
        dispatch(setAllExternalApplications(res.data))
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

export const getAllIITISMUserApplications = (mounted) => (dispatch) => {
  const token = localStorage.getItem('adminToken')
  axios
    .get('/api/v1/applications', {
      headers: { Authorization: `Bearer ${token}` },
      params: { type: 'iitism' }
    })
    .then((res) => {
      if (mounted) {
        dispatch(setAllIITISMApplications(res.data))
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

export const loginAdmin = (adminData, callback) => (dispatch) => {
  axios
    .post('/api/v1/applicants/login', adminData, {
      params: {
        type: 'iitism'
      }
    })
    .then((res) => {
      const { token } = res.data
      localStorage.setItem('adminToken', token)

      // Decode token to get user data

      const decoded = jwt_decode(token)

      dispatch(setCurrentAdminId(decoded.id))
      dispatch(setCurrentAdminType('iitism'))
      callback()
      setTimeout(() => {
        toast.success('Logged In Successfully! 😄', {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        })
        setTimeout(() => (window.location.pathname = '/admin_dashboard'), 1000)
      }, 3500)
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

// download pdf of application

export const downloadPdf = (id, name, callback) => (dispatch) => {
  const token = localStorage.getItem('adminToken')
  axios
    .get(`/api/v1/pdf/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'blob'
    })
    .then((response) => {
      const content = response.headers['content-type']
      download(response.data, name+'Application', content)
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

export const setCurrentPdf = (data) => {
  return {
    type: AdminActionTypes.SET_CURRENT_PDF,
    payload: data
  }
}

export const setCurrentIdea = (data) => {
  return {
    type: AdminActionTypes.SET_CURRENT_IDEA,
    payload: data
  }
}

export const setCurrentApplication = (data) => {
  return {
    type: AdminActionTypes.SET_CURRENT_APPLICATION,
    payload: data
  }
}

export const setCurrentAdminId = (id) => {
  return {
    type: AdminActionTypes.SET_CURRENT_ADMIN_ID,
    payload: id
  }
}

export const setCurrentAdminType = (type) => {
  return {
    type: AdminActionTypes.SET_CURRENT_ADMIN_TYPE,
    payload: type
  }
}

export const setAllIITISMApplications = (data) => {
  return {
    type: AdminActionTypes.GET_ALL_IITISM_APPLICATIONS,
    payload: data
  }
}

export const setAllExternalApplications = (data) => {
  return {
    type: AdminActionTypes.GET_ALL_EXTERNAL_APPLICATIONS,
    payload: data
  }
}

// Log admin out
export const logoutAdmin = () => (dispatch) => {
  // Remove token from local storage
  localStorage.removeItem('adminToken')

  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentAdminId(null))
  dispatch(setCurrentAdminType(null))
}
