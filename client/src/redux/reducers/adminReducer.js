import { AdminActionTypes } from '../types'

const initialState = {
  adminId: '',
  currentIdea: null,
  currentApplication: {},
  type: '',
  pending: [],
  approved: [],
  rejected: [],
  pendingOther: [],
  approvedOther: [],
  rejectedOther: [],
  currentPdf: null,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case AdminActionTypes.SET_CURRENT_ADMIN_ID:
      return {
        ...state,
        adminId: action.payload
      }
    case AdminActionTypes.SET_CURRENT_ADMIN_TYPE:
      return {
        ...state,
        type: action.payload
      }
    case AdminActionTypes.GET_ALL_IITISM_APPLICATIONS:
      return {
        ...state,
        pending: action.payload.pending,
        approved: action.payload.approved,
        rejected: action.payload.rejected,
        reverted: action.payload.reverted
      }
    case AdminActionTypes.GET_ALL_EXTERNAL_APPLICATIONS:
      return {
        ...state,
        pendingOther: action.payload.pending,
        approvedOther: action.payload.approved,
        rejectedOther: action.payload.rejected,
        revertedOther: action.payload.reverted
      }
    case AdminActionTypes.SET_CURRENT_APPLICATION:
      return {
        ...state,
        currentApplication: action.payload
      }
    case AdminActionTypes.SET_CURRENT_IDEA:
      return {
        ...state,
        currentIdea: action.payload
      }
    case AdminActionTypes.SET_CURRENT_PDF:
      return {
        ...state,
        currentPdf: action.payload
      }
    default:
      return state
  }
}
