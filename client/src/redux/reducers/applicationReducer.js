import { ApplicationActionTypes } from '../types'

const initialState = {
  approved: [],
  rejected: [],
  pending: [],
  currentFile: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case ApplicationActionTypes.GET_ALL_APPLICATIONS:
      return {
        ...state,
        approved: action.payload.approved,
        rejected: action.payload.rejected,
        pending: action.payload.pending,
        reverted: action.payload.reverted
      }
    case ApplicationActionTypes.SET_CURRENT_FILE:
      return {
        ...state,
        currentFile: action.payload
      }
    default:
      return state
  }
}
