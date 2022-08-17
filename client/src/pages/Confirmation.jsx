import React, { useEffect, useState } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import axios from "axios";
import { Spinner } from "react-bootstrap";

function Confirmation() {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [confirmationError, setConfirmationError] = useState(false);
  const [badRequest, setBadRequest] = useState(false);
  const location = useLocation();
  useEffect(() => {
    // const loading = document.querySelector(".confirmation_loading");
    // const message = document.querySelector(".confirmation_message");
    const id = new URLSearchParams(location.search).get("q");
    if (!id) {
      setBadRequest(true);
    } else {
      axios
        .get(`http://localhost:8080/api/v1/confirm?q=${id}`)
        .then((response) => {
          if (response.data[0]) {
            setIsConfirmed(true);
          } else {
            setConfirmationError(true);
          }
        })
        .catch((error) => {
          setConfirmationError(true);
        });
    }
    // eslint-disable-next-line
  }, []);
  if (badRequest) {
    return <Redirect to="/" />;
  } else {
    return (
      <div className="confirmation_page">
        {isConfirmed === false && confirmationError === false ? (
          <div className="confirmation_body confirmation_loading">
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        ) : null}
        {isConfirmed === true ? (
          <div className="confirmation_body confirmation_message">
            <div>
              <h1 class="display-1 mb-5">YAY!</h1>
            </div>
            <div className="mb-5 mt-5">
              <h2>Your account has been confirmed</h2>
            </div>
            <div>
              <Link className="mt-3 md-3 custom-button" to="/login">
                <button className="button mt-2 btn btn-primary">Get Started</button>
              </Link>
            </div>
          </div>
        ) : null}
        {confirmationError === true ? (
          <div className="confirmation_body confirmation_error" id="confirmation_error">
            <div>
              <h1 class="display-1 mb-5">OOPS!</h1>
            </div>
            <div className="mb-5 mt-5">
              <h2>Your Account was not confirmed kindly try again later</h2>
            </div>
            <div>
              <Link className="mt-3 md-3 custom-button" to="/">
                <button className="button mt-2 btn btn-primary">Get Back to Home</button>
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Confirmation;
