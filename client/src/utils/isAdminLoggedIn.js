export const isAdminLogin = () => {
  if (localStorage.getItem("adminToken")) {
    return true;
  }
  return false;
};
