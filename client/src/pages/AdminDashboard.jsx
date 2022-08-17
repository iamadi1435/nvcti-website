import React, { useEffect, Suspense, lazy } from "react";
import Loading from "../components/common/Loading";
const AdminHeader = lazy(() => import("../components/Admin/adminDashboard/header"));
const AdminMain = lazy(() => import("../components/Admin/adminDashboard/main"));

const AdminDashboard = () => {
  useEffect(() => {
    document.title = "Dashboard | NVCTI";
    document.body.style.backgroundColor = "#eef5f9";
    return () => (document.body.style.backgroundColor = null);
  }, []);
  return (
    <Suspense fallback={<Loading />}>
      <AdminHeader />
      <AdminMain />
    </Suspense>
  )
};

export default AdminDashboard;
