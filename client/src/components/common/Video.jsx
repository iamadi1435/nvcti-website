import React, { useEffect } from "react";
import OwlCarousel from "react-owl-carousel";
import { Container } from "react-bootstrap";
import Loader from '../common/loader';
import { Fade } from "react-reveal";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { setYoutubeVideos } from "../../redux/actions/videoActions";
import { useMediaQuery } from "react-responsive";
import LazyLoad from "react-lazyload";

const Video = ({ setYoutubeVideos, youtubeVideos }) => {
  useEffect(() => {
    let mounted = true;
    fetch("https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=6&playlistId=UU4Uw9mJgYrssRq6vC7fO3fA&key=AIzaSyDl39u_3_FmqOec7YTpYDpGBlS2DaH0-Q0")
      .then((res) => res.json())
      .then((data) => {
        if (mounted)
          setYoutubeVideos(data.items);
      })
      .catch((err) => console.warn(err));
    return () => (mounted = false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isTablet = useMediaQuery({ query: "(max-width: 780px)" });
  const isMobile = useMediaQuery({
    query: "(max-width: 430px)",
  });

  return (
    <div className="word-section slider justify-align-center">
      <Fade>
        <h2 className="mb-5" style={{ flexDirection: "row" }}>
          VIDEOS
        </h2>
      </Fade>
      <Container>
        <Fade>
          {youtubeVideos.length !== 0 ? (
            <OwlCarousel
              id="carousel"
              items={isMobile?1:(isTablet?2:3)}
              className="owl-theme"
              responsiveClass={true}
              loop={true}
              nav={true}
              navText={["<", ">"]}
              smartSpeed={2000}
              dots={false}
              animateIn="ease-in"
            >
              {
              (youtubeVideos[0] || []).map((element, ind) => {
                let link = "https://www.youtube.com/embed/" +
                  element.contentDetails.videoId;
                if (ind === 0) {
                  return null;
                }

                return (
                  <div className="single-blog" key={ind}>
                    <div className="blog-img" style={{ height: "auto" }}>
                      <LazyLoad once={true} placeholder={<Loader variant="dark" />}>
                        <iframe
                          style={{ width: "98%" }}
                          title="nvcti youtube videos"
                          src={link}
                          height={250}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen={true}
                          loading="lazy"
                        ></iframe>
                      </LazyLoad>
                    </div>
                  </div>
                );
              })}
            </OwlCarousel>
          ) : (
            <div style={{ flexDirection: "row" }} className="justify-align-center">
              <Loader variant="dark" />
            </div>
          )}
        </Fade>
      </Container>
    </div>
  );
};

Video.propTypes = {
  setYoutubeVideos: PropTypes.func.isRequired,
};


const mapStateToProps = ({ video }) => ({
  youtubeVideos: video.youtubeVideos,
});

const mapDispatchToProps = (dispatch) => ({
  setYoutubeVideos: (data) => dispatch(setYoutubeVideos(data)),
});

export default connect(mapStateToProps,mapDispatchToProps)(Video);
