import React, { useEffect, lazy, Suspense } from "react";
import Loading from "../components/common/Loading";
const NavbarComponent = lazy(() => import("../components/common/navbar"));
const Footer = lazy(() => import("../components/common/footer"));
const FlagshipEventEditionsMain = lazy(() => import("../components/events-page/flagship-events/FlagshipEventEditionsMain"));
const FlagshipEventEditionsCover = lazy(() => import("../components/events-page/flagship-events/FlagshipEventEditionsCover"));

const FlagshipEventEditions = () => {
  useEffect(() => {
    const func = () => {
      document.title = "Flagship Event Editions | NVCTI";
    };
    func();
  }, []);
  return (
    <Suspense fallback={<Loading/>}>
      <NavbarComponent variant="transparent" />
      <FlagshipEventEditionsCover />
      <FlagshipEventEditionsMain />
      <Footer />
    </Suspense>
  );
};

export default FlagshipEventEditions
