import React, { useEffect, lazy, Suspense } from "react";
import Loading from "../components/common/Loading";
const NavbarComponent = lazy(() => import("../components/common/navbar"));
const Footer = lazy(() => import("../components/common/footer"));
const GalleryCover = lazy(() => import("../components/Gallery/galleryCover"));
const GalleryMain = lazy(() => import("../components/Gallery/galleryMain"));

const Homepage = () => {
  useEffect(() => {
    const func = () => {
      document.title = "Gallery | NVCTI";
    };
    func();
  }, []);
  return (
    <Suspense fallback={<Loading/>}>
      <NavbarComponent variant="transparent" />
      <GalleryCover/>
      <GalleryMain/>
      <Footer />
    </Suspense>
  );
};

export default Homepage;
