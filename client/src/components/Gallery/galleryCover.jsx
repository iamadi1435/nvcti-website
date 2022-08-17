import React from "react";
import { Fade } from "react-reveal";

const GalleryCover = () => {
  const title = localStorage.getItem("galleryTitle");
  return (
    <div className="bg-div" id="gallery">
      <div className="head mx-5">
        <div className="head-div mx-auto main-div">
          <Fade top cascade>
            <div className="page-heading text-center">
              <h3 className="side-line third-text mb-3">Collection Gallery</h3>
              <h1 className="second-text">{title}</h1>
            </div>
          </Fade>
        </div>
      </div>
      <Fade bottom>
        <span className="scroll-btn">
          <span className="mouse">
            <span></span>
          </span>
        </span>
      </Fade>
    </div>
  );
};

export default GalleryCover;
