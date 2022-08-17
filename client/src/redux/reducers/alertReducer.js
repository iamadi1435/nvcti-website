import { AlertActionTypes } from "../types";

const initialState = { alert: "" };

export default function (state = initialState, action) {
  switch (action.type) {
    case AlertActionTypes.SET_ALERT_MESSAGE:
      return {
        ...state,
        alert: action.payload,
      };
    default:
      return state;
  }
}
