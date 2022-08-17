import React, { lazy, Suspense } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Fade } from "react-reveal";
import { connect } from "react-redux";
import Loader from "../../common/loader";
const SingleEventCard = lazy(() => import("../single-event-card"));

const UpcomingInfo = ({ upcoming }) => {

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
          <Row style={{ justifyContent: 'center' }}>
            <Col md={12} sm={12} lg={12}>
              <Fade cascade>
                <div>
                  <p className="text mt-4" style={{ fontSize: '20px' }}>
                    <strong>
                      Naresh Vashisht Centre for Tinkering and Innovation
                    </strong>{' '}
                    is going to host the following events in the upcoming days.
                    Kindly register yourself soon if the registration process
                    has started. Stay tuned for other events!
                  </p>
                </div>
              </Fade>
            </Col>
          </Row>
          {upcoming.length !== 0 ? (
            upcoming.map((item, i) => (
              <SingleEventCard
                key={i}
                img={item['PHOTO']}
                title={item['EVENT NAME']}
                date={item['DATE']}
                link={item['REGISTERATION LINK']}
                desc={item['DESCRIPTION']}
                eventType="upcoming"
                docs={item['FLYER/DOCUMENTS FOR REFERENCE (link)']}
              />
            ))
          ) : (
            <div
              style={{ marginTop: '100px' }}
              className="justify-align-center">
              <Loader
                variant="dark"
                message="Hold on a little 😃, we're getting the information!"
                extraStyle={{ fontSize: '20px' }}
              />
            </div>
          )}
        </Container>
      </section>
    </Suspense>
  )
};

const mapStateToProps = ({ event }) => ({
  upcoming: event.upcoming,
});

export default connect(mapStateToProps, null)(UpcomingInfo);
