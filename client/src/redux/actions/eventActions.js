import { EventActionTypes } from "../types";

// Fetch Upcoming Events
export const setUpcomingEvents = (data) => {
  return {
    type: EventActionTypes.GET_UPCOMING_EVENTS,
    payload: data,
  };
};

// Fetch Ongoing events
export const setOngoingEvents = (data) => {
  return {
    type: EventActionTypes.GET_ONGOING_EVENTS,
    payload: data,
  };
};

// Fetch Other Events
export const setOtherEvents = (data) => {
  return {
    type: EventActionTypes.GET_OTHER_EVENTS,
    payload: data,
  };
};

// Fetch Flagship Events
export const setFlagshipEvents = (data) => {
  return {
    type: EventActionTypes.GET_FLAGSHIP_EVENTS,
    payload: data,
  };
};

// Fetch Flagship Events
export const setFlagshipEventCategories = (data) => {
  return {
    type: EventActionTypes.GET_FLAGSHIP_EVENT_CATEGORIES,
    payload: data,
  };
};

// Fetch Mic Events
export const setMicEvents = (data) => {
  return {
    type: EventActionTypes.GET_MIC_EVENTS,
    payload: data,
  };
};

// Set Current Gallery Photos
export const setCurrentPhotos = (data) => {
  return {
    type: EventActionTypes.GET_CURRENT_PHOTOS,
    payload: data
  }
}
