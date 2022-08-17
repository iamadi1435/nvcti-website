import React, { useEffect, lazy, Suspense } from "react";
import Loading from "../components/common/Loading";
const NavbarComponent = lazy(() => import("../components/common/navbar"));
const EventsCover = lazy(() => import("../components/events-page/cover"));
const Footer = lazy(() => import("../components/common/footer"));
const EventInfo = lazy(() => import("../components/events-page/info"));
const SingleCard = lazy(() => import("../components/events-page/single-card"));
const Work = lazy(() => import("../components/events-page/work"));

const Events = () => {
  useEffect(() => {
    const func = () => {
      document.title = "Events | NVCTI";
    };
    func();
  }, []);
  return (
    <Suspense fallback={<Loading/>}>
      <NavbarComponent variant="transparent"/>
      <EventsCover />
      <EventInfo />
      <SingleCard />
      <Work />
      <Footer extraStyle={{ marginTop: "0" }} />
    </Suspense>
  );
};

export default Events;
