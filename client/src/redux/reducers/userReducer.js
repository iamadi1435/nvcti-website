import { UserActionTypes } from "../types";

const initialState = { userId:null, type:null };

export default function (state = initialState, action) {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER_ID:
      return {
        ...state,
        userId: action.payload,
      };
    case UserActionTypes.SET_CURRENT_USER_TYPE:
      return {
        ...state,
        type: action.payload,
      };
    default:
      return state;
  }
}
