import React from "react";
import { Fade } from "react-reveal";

const SingleEventCover = ({ keyword, title }) => {
  return (
    <div className={"bg-div " + keyword} id="single-events">
      <div className="head mx-5">
        <div className="head-div mx-auto main-div">
          <Fade top cascade>
            <div className="page-heading text-center">
              <h1 className="second-text">{title}</h1>
              <h3 className="side-line third-text">
                STAY INNOVATIVE
                <br /> With Events Happening Around
              </h3>
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

export default SingleEventCover;
