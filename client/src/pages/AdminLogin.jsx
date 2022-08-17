import React, { useEffect, Suspense, lazy } from "react";
import Loading from "../components/common/Loading";
const AdminLoginMain = lazy(() => import("../components/Admin/adminLogin"));
const AdminLogin = () => {
  useEffect(() => {
    const func = () => {
      document.title = "Admin | NVCTI";
    };
    func();
  }, []);
  return (
    <Suspense fallback={<Loading />}>
      <AdminLoginMain />
    </Suspense>
  );
};

export default AdminLogin;
