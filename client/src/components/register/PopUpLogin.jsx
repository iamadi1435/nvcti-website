import React from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import { Fade } from "react-reveal";
import DarkLogo from "../../assets/logo/nvcti_color.png";
import IITISMLogo from "../../assets/utils/iitism-logo-transparent.png";
import IITISMLogin from "../Login/iitismlogin";
import OtherLogin from "../Login/otherlogin";

const IITISMForm = () => {
  return <IITISMLogin />;
};

const OtherForm = () => {
  return <OtherLogin />;
};

const PopUpLogin = (props) => {
  return (
    <>
      <Modal show={props.show} onHide={props.onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Body>
          <Fade>
            <div className="section-title center-xs">
              {/* <div className="sm-top-bottom40">
                <h4>Log In</h4>
              </div> */}
              <Container style={{ maxWidth: "100vw" }}>
                <Row>
                  <Col md={4} sm={12} lg={5} className="right-side justify-align-center">
                    <img src={props.formToggle === "IITISM" ? IITISMLogo : DarkLogo} width="150px" height="auto" alt="mode-indicator-logo" />
                  </Col>
                  <Col md={8} sm={12} lg={7} className="left-side justify-align-center">
                    {props.formToggle === "IITISM" ? (
                      <Fade>
                        <IITISMForm />
                      </Fade>
                    ) : (
                      <Fade>
                        <OtherForm />
                      </Fade>
                    )}
                  </Col>
                </Row>
              </Container>
            </div>
          </Fade>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PopUpLogin;
