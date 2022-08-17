import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from "../common/loader";
import LazyLoad from 'react-lazyload';

const GalleryMain = ({ gallery }) => {
  return (
    <section className="gallery-page-section">
      <Container>
        <Row>
          {gallery.map((data,ind) => {
            return (
              <Col md={6} sm={12} lg={4} className="gallery-item" key={data + ind}>
                <div className="gallery-wrap">
                  <LazyLoad once={true} placeholder={<Loader variant="dark" />}>
                    <img className="gallery-image" src={`https://drive.google.com/uc?export=view&id=${data}`} alt="gallery_pic" />
                  </LazyLoad>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
};

GalleryMain.propTypes = {
  gallery:PropTypes.func.isRequired
}

const mapStateToProps = ({ event }) => ({
  gallery: event.currentPhotos,
});

export default connect(mapStateToProps,null)(GalleryMain);
