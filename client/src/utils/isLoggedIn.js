export const isLogin = () => {
  if (localStorage.getItem("jwtToken")) {
    return true;
  }
  return false;
};
