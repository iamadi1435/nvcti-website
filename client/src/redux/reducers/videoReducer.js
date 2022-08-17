import { VideosActionTypes } from "../types";

const initialState = { youtubeVideos: [] };

export default function (state = initialState, action) {
  switch (action.type) {
    case VideosActionTypes.GET_YOUTUBE_VIDEOS:
      return {
        ...state,
        youtubeVideos: [action.payload],
      };
    default:
      return state;
  }
}
