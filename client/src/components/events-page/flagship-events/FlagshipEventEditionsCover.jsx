import React from "react";
import { Fade } from "react-reveal";

const FlagshipEventEditionsCover = () => {
  const title = new URL(window.location).pathname.split('/').pop()
  return (
    <div className="bg-div" id="flagship-event-editions-cover">
      <div className="head mx-5">
        <div className="head-div mx-auto main-div">
          <Fade top cascade>
            <div className="page-heading text-center" style={{width:'80%'}}>
              <h3 className="side-line third-text mb-3">Events List</h3>
              <h1 className="second-text">{decodeURI(title)}</h1>
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

export default FlagshipEventEditionsCover;
