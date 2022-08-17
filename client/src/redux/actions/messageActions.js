import axios from "axios";

export const sendMessage = (msgData, callback) => {
  return new Promise((resolve, reject) => {
    axios
    .post("/api/v1/messages", msgData, {})
    .then((res) => {
      callback();
      resolve(res);
    })
    .catch((err) => {
      callback();
      reject(err.response);
    });
  })
};