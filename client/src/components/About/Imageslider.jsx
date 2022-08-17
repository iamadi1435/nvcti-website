import React from "react";
import Img from "../../assets/dummy.png";
import OwlCarousel from "react-owl-carousel";
import { Container } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { Fade } from "react-reveal";

const ImageSlider = ({ title }) => {
  const isDesktop = useMediaQuery({
    query: "(min-device-width: 992px)",
  });

  const isTablet = useMediaQuery({
    query: "(min-device-width: 767px)",
  });

  return (
    <div
      className="word-section slider justify-align-center"
      style={{ marginBottom: "150px" }}
    >
      <Fade cascade>
        <h2 className="mb-5" style={{ flexDirection: "row" }}>
          {title}
        </h2>
      </Fade>
      <Container>
        <Fade cascade>
          <OwlCarousel
            id="carousel"
            className="owl-theme"
            responsiveClass={true}
            items={isDesktop ? 3 : isTablet ? 2 : 1}
            loop={true}
            nav={true}
            navText={["<", ">"]}
            autoplay={true}
            autoplayTimeout={9000}
            smartSpeed={2000}
            dots={false}
            animateIn="ease-in"
          >
            {[1, 2, 3, 4, 5, 6].map((data, ind) => {
              return (
                <div className="single-blog" key={data + ind}>
                  <div className="blog-img" style={{ height: "auto" }}>
                    <img
                      src={Img}
                      alt="blog-img"
                      style={{ height: "100%", cursor: "pointer" }}
                    />
                  </div>
                </div>
              );
            })}
          </OwlCarousel>
        </Fade>
      </Container>
    </div>
  );
};

export default ImageSlider;
