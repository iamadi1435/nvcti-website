import { combineReducers } from "redux";
import userReducer from "./userReducer";
import errorReducer from "./errorReducer";
import adminReducer from "./adminReducer";
import applicationReducer from "./applicationReducer";
import alertReducer from "./alertReducer";
import eventReducer from "./eventReducer";
import announcementReducer from "./announcementReducer";
import videoReducer from "./videoReducer";
export default combineReducers({
  user: userReducer,
  admin: adminReducer,
  application: applicationReducer,
  errors: errorReducer,
  alert: alertReducer,
  event: eventReducer,
  announcement:announcementReducer,
  video:videoReducer
});
