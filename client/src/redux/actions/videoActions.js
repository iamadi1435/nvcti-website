import { VideosActionTypes } from "../types";

// Fetch Youtube Videos
export const setYoutubeVideos = (data) => {
  return {
    type: VideosActionTypes.GET_YOUTUBE_VIDEOS,
    payload: data,
  };
};
