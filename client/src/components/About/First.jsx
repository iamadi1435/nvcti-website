import React from "react";
import { Fragment } from "react";
import Fade from "react-reveal/Fade";
export default function First() {
  return (
    <Fragment>
      <div className="box-div justify-center" id="home">
        <div className="head mx-5">
          <div className="head-div mx-auto main-div">
            <Fade top cascade>
              <section className="div-1">
                <h1 className="head-div-first-text">About Us</h1>
                <h4 className="head-div-second-text">
                  We are NVCTI, IIT (ISM) Dhanbad{' '}
                </h4>
              </section>
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
    </Fragment>
  )
}
