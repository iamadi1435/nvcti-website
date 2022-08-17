import { ErrorActionTypes } from "../types";

const initialState = { error: "" };

export default function (state = initialState, action) {
  switch (action.type) {
    case ErrorActionTypes.GET_ERRORS:
      return {
        error: action.payload,
      };
    default:
      return state;
  }
}
