import React, { lazy, Suspense } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from "../../common/loader";
import { Container, Row } from 'react-bootstrap'

const SingleEventCard = lazy(() => import('../single-event-card'))

function count(arr, val) {
  return arr.reduce((a, c) => c === val ? a + 1 : a, 0)
}

const FlagshipEventEditionsMain = ({ flagship }) => {

  const category = decodeURI(
    new URL(window.location).pathname.split('/').pop()).toLowerCase()

  let array = []

  return (
    <Suspense
      fallback={
        <div style={{ margin: '100px 0' }} className="justify-align-center">
          <Loader
            extraStyle={{
              height: '2rem',
              width: '2rem',
              borderWidth: '0.3rem'
            }}
          />
        </div>
      }>
      <section className="events single">
        <Container>
          <Row>
            {
              flagship.filter(item => item['CATEGORY'].toLowerCase() === category).map((item, i) => {
                  array = [...array, item['YEAR']]
                  let galleryData = item['GALLERY'].split(',')
                  if (count(array, item['YEAR']) === 1) {
                    return (
                        <SingleEventCard
                          key={i}
                          img={item['PHOTO']}
                          title={item['EVENT NAME']}
                          date={item['DATE']}
                          link={item['REGISTERATION LINK']}
                          desc={item['DESCRIPTION']}
                          winner={item['WINNER']}
                          gallery={galleryData}
                          eventType="flagship"
                        />
                    )
                  } else {
                    return (
                        <SingleEventCard
                          key={i}
                          img={item['PHOTO']}
                          title={item['EVENT NAME']}
                          date={item['DATE']}
                          link={item['REGISTERATION LINK']}
                          desc={item['DESCRIPTION']}
                          eventType="flagship"
                          gallery={galleryData}
                          winner={item['WINNER']}
                        />
                    )
                  }
                }
              )
            }
          </Row>
        </Container>
      </section>
    </Suspense>
  );
};

FlagshipEventEditionsMain.propTypes = {
  gallery: PropTypes.func.isRequired
}

const mapStateToProps = ({ event }) => ({
  flagship: event.flagship
});

export default connect(mapStateToProps,null)(FlagshipEventEditionsMain);
