import React, { useEffect, lazy, Suspense } from "react";
import Loading from "../components/common/Loading";
const NavbarComponent = lazy(() => import("../components/common/navbar"));
const Footer = lazy(() => import("../components/common/footer"));
const FacilitiesComponent = lazy(() => import("../components/facilities/FacilitiesComponent"));

const Facilities = () => {
  useEffect(() => {
    const func = () => {
      document.title = "Facilities | NVCTI";
    };
    func();
  }, []);
  return (
    <Suspense fallback={<Loading />}>
      <NavbarComponent variant="light"/>
      <FacilitiesComponent />
      <Footer extraStyle={{ marginTop: "0" }} />
    </Suspense>
  );
};

export default Facilities;
