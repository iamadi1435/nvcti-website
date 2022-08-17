import React, { useEffect, Suspense, lazy } from "react";
import Loading from "../components/common/Loading";
const NavbarComponent = lazy(() => import("../components/common/navbar"));
const First = lazy(() => import("../components/About/First"));
const Details = lazy(() => import("../components/About/Details"));
const Easein = lazy(() => import("../components/About/Easein"));
const Footer = lazy(() => import("../components/common/footer"));
const Flip = lazy(() => import("../components/About/Flip"));
const Last = lazy(() => import("../components/About/Last"));
const AdminStructure = lazy(() => import("../components/About/AdminStructure"));
export default function About() {
  useEffect(() => {
    const func = () => {
      document.title = "About Us | NVCTI";
    };
    func();
  }, []);
  return (
    <Suspense fallback={<Loading />}>
      <NavbarComponent variant="transparent" />
      <First />
      <Details />
      <Easein />
      <Flip />
      <Last />
      <AdminStructure />
      <Footer />
    </Suspense>
  );
}
