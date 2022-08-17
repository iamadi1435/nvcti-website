import React, { Fragment } from "react";
import Fade from "react-reveal/Fade";
export default function Discover() {
  return (
    <Fragment>
      <Fade cascade>
        <div style={{ marginTop: "100px" }}>
          <div style={{ width: "100%", margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ marginBottom: "50px" }}>Checkout Projects</h2>
            <button className="styleme">
              <a style={{ color: "inherit" }} href="/">
                Discover
              </a>
            </button>
          </div>
        </div>
      </Fade>
    </Fragment>
  );
}
