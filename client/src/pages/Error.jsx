import React,{useEffect} from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { Fade } from 'react-reveal';

const Error = () => {
  useEffect(() => {
    document.title = "Error 404";
  }, []);

  return (
    <Fade>
      <div id="notfound">
        <div class="notfound">
          <div class="notfound-404">
            <h1>
              4<FontAwesomeIcon className="fa-spin far" icon={faQuestionCircle} />4
            </h1>
          </div>
          <p>Maybe this page moved? Got deleted? Is hiding out in quarantine? Never existed in the first place?</p>
          <Link to="/">Home Page</Link>
        </div>
      </div>
    </Fade>
  );
}

export default Error
