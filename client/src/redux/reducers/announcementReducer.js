import { AnnouncementActionTypes } from "../types";

const initialState = { announcements: [] };

export default function (state = initialState, action) {
  switch (action.type) {
    case AnnouncementActionTypes.GET_ANNOUNCEMENTS:
      return {
        announcements: action.payload,
      };
    default:
      return state;
  }
}
