import { AnnouncementActionTypes } from "../types";

// Fetch Annoucements
export const setAnnouncements = (data) => {
  return {
    type: AnnouncementActionTypes.GET_ANNOUNCEMENTS,
    payload: data,
  };
};
