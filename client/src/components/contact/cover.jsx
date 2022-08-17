import React from 'react';
import { Fade } from 'react-reveal';

const ContactCover = () => {
    return (
      <div className="bg-div" id="contact">
        <div className="head mx-5">
          <div className="head-div mx-auto main-div">
            <Fade top cascade>
              <div className="page-heading text-center">
                <p className="font-italic side-line first-text text-center">Let's</p>
                <h1 className="second-text">Get in touch</h1>
              </div>
            </Fade>
          </div>
        </div>
        <Fade bottom>
          <span className="scroll-btn dark">
            <span className="mouse">
              <span></span>
            </span>
          </span>
        </Fade>
      </div>
    );
}

export default ContactCover
