import React, { useEffect, lazy, Suspense } from "react";
import Loading from "../components/common/Loading";
const NavbarComponent = lazy(() => import("../components/common/navbar"));
const Footer = lazy(() => import("../components/common/footer"));
const SingleEventCover = lazy(() => import("../components/events-page/single-event-cover"));
const FlagshipInfo = lazy(() => import("../components/events-page/flagship-events/info"));

const FlagshipEvents = () => {
  useEffect(() => {
    const func = () => {
      document.title = "Flagship Events | NVCTI";
    };
    func();
  }, []);
  return (
    <Suspense fallback={<Loading/>}>
      <NavbarComponent variant="transparent" />
      <SingleEventCover keyword="flagship" title="Flagship Events" />
      <FlagshipInfo />
      <Footer extraStyle={{ marginTop: "0" }} />
    </Suspense>
  );
};

export default FlagshipEvents
