import React, { useState, Suspense } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import Fade from "react-reveal/Fade";
import { isLogin } from "../../utils/isLoggedIn";
import Loading from "./Loading";
import DarkLogo from "../../assets/logo/nvcti-transparent-no-text.png";
import WhiteLogo from "../../assets/logo/nvcti-white.png";

const NavbarComponent = ({ variant }) => {
  const changeBackground = () => {
    let header = document.getElementsByClassName("header-nav")[0];
    if (window.scrollY < 100) {
      if (header) {
        header.classList.remove("sticky");
        header.classList.remove("header-nav-scrolled");
      }
    } else {
      if (header) {
        header.classList.add("sticky");
        header.classList.add("header-nav-scrolled");
      }
    }
  };

  window.addEventListener("scroll", changeBackground);

  const [hover, setHover] = useState(false);

  const handleHover = () => setHover(!hover);
  const [isOpen, setIsOpen] = useState(false);

  const handleTogglerClick = () => {
    let header = document.getElementsByClassName("header-nav")[0];
    if (isOpen) {
      setTimeout(() => {
        header.style.height = "fit-content";
      }, 500);
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <Suspense fallback={<Loading />}>
      <Navbar className={`header-nav ${variant}`} fixed="top" collapseOnSelect expand="xl">
        <Fade>
          <Link to="/" className="brand-name ml-5 navbar-brand">
            <img
              id="main-logo"
              title="Narendra Vashishta Centre for Tinkering and Innovation"
              src={variant === "light" ? DarkLogo : WhiteLogo}
              className="d-inline-block align-top"
              alt="logo"
            />
          </Link>
        </Fade>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={handleTogglerClick} style={{ height: "40px" }} />
        <Navbar.Collapse id="responsive-navbar-nav" style={{ justifyContent: "flex-end" }}>
          <Fade>
            <Nav className="ml-auto mr-5">
              <Link className="px-4 nav-link" to="/">
                Home
              </Link>
              <Link className="px-4 nav-link" to="/about">
                About Us
              </Link>
              <Link className="px-4 nav-link" to="/facilities">
                Facilities
              </Link>
              <Link className="px-4 nav-link" to="/coming_soon">
                Projects
              </Link>
              <div className={"dropdown nav-item justify-center " + (hover && "show")} onMouseEnter={handleHover} onMouseLeave={handleHover}>
                <p
                  aria-haspopup="true"
                  aria-expanded={hover}
                  id="collasible-nav-dropdown"
                  aria-disabled
                  className="px-4 dropdown-toggle nav-link"
                  role="button"
                  style={{ cursor: "pointer", marginBottom: 0 }}
                >
                  Events
                </p>
                <div
                  aria-labelledby="collasible-nav-dropdown"
                  className={"dropdown-menu " + (hover && "show")}
                  style={{
                    margin: 0,
                    borderRadius: 0,
                    background: variant === "transparent" && "rgba(0,0,0,0.3)",
                  }}
                >
                  <Fade top cascade>
                    <Link className="nav-link pad-5 sub-links width-max" to="/events">
                      All Events
                    </Link>
                    <Link className="nav-link pad-5 sub-links width-max" to="/upcoming-events">
                      Upcoming Events
                    </Link>
                    <Link className="nav-link pad-5 sub-links width-max" to="/flagship-events">
                      Flagship Events
                    </Link>
                    <Link className="nav-link pad-5 sub-links width-max" to="/mic-events">
                      Mic Events
                    </Link>
                    <Link className="nav-link pad-5 sub-links width-max" to="/other-events">
                      Other Events
                    </Link>
                  </Fade>
                </div>
              </div>
              <Link className="px-4 nav-link" to="/coming_soon">
                Contribute
              </Link>
              <Link className="px-4 nav-link" to="/contact">
                Contact Us
              </Link>
              {/* {!isLogin() && (
                <Link className="px-4 nav-link" to="/register">
                  Register
                </Link>
              )} */}
              {!isLogin() && (
                <Link className="px-4 nav-link" to="/register">
                  Login
                </Link>
              )}
              {isLogin() && (
                <Link className="px-4 nav-link" to="/profile">
                  Profile
                </Link>
              )}
            </Nav>
          </Fade>
        </Navbar.Collapse>
      </Navbar>
    </Suspense>
  );
};

export default NavbarComponent;
