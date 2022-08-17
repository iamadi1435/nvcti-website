import { EventActionTypes } from "../types";

const initialState = { upcoming: [], other: [], mic: [], flagship: [], currentPhotos: [], ongoing: [] };

export default function (state = initialState, action) {
  switch (action.type) {
    case EventActionTypes.GET_UPCOMING_EVENTS:
      return {
        ...state,
        upcoming: action.payload,
      };
    case EventActionTypes.GET_FLAGSHIP_EVENTS:
      return {
        ...state,
        flagship: action.payload,
      };
    case EventActionTypes.GET_FLAGSHIP_EVENT_CATEGORIES:
      return {
        ...state,
        flagshipCategories: action.payload,
      };
    case EventActionTypes.GET_MIC_EVENTS:
      return {
        ...state,
        mic: action.payload,
      };
    case EventActionTypes.GET_OTHER_EVENTS:
      return {
        ...state,
        other: action.payload,
      };
    case EventActionTypes.GET_CURRENT_PHOTOS:
      return {
        ...state,
        currentPhotos: action.payload,
      };
    case EventActionTypes.GET_ONGOING_EVENTS:
      return {
        ...state,
        ongoing: action.payload
      }
    default:
      return state;
  }
}
