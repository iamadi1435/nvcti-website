import React, { lazy, Suspense, useEffect } from "react";
import Loading from "../components/common/Loading";
const NavbarComponent = lazy(() => import("../components/common/navbar"));
const Main = lazy(() => import("../components/Login/main"));

const Login = () => {
  useEffect(() => {
    const func = () => {
      document.title = "Login | NVCTI";
    };
    func();
  }, []);
  return (
    <Suspense fallback={<Loading />}>
      <NavbarComponent variant="light" />
      <Main />
    </Suspense>
  );
};

export default Login;
