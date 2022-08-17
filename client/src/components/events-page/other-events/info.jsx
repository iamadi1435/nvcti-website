import React, { useEffect, useState, lazy, Suspense } from "react";
import { Container, Row, Col, Tabs, Tab } from "react-bootstrap";
import { Fade } from "react-reveal";
import { connect } from "react-redux";
import Tabletop from 'tabletop';
import { setOtherEvents } from "../../../redux/actions/eventActions";
import Loader from "../../common/loader";
const SingleEventCard = lazy(() => import("../single-event-card"));

function count(array, value) {
  return array.filter((v) => (v === value)).length;
}
const OtherInfo = ({ setOtherEvents, other }) => {
  const [key, setKey] = useState(2020);
  //useState(new Date().getFullYear());
  var array = [];
  useEffect(() => {
    let mounted = true;
    Tabletop.init({
      key: "1klepIwNqq0BCENjh-Vb_eeeZRtzK1nrNbPlzhIeG1QM",
      simpleSheet: true,
    })
      .then((data) => {
        if (mounted) {
          setOtherEvents(data);
        }
      })
      .catch((err) => console.warn(err));
    return () => (mounted = false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                    collaborates and works in association with{' '}
                    <strong>various organisations</strong> and{' '}
                    <strong>institute alumni</strong> to host sponsored events
                    favouring students. The centre conducts various sponsored
                    award contests, such as{' '}
                    <strong>Piyush Dutta Innovation and Invention Prize</strong>
                    , annually. The centre aims to unite with the best
                    establishments and brilliant people to cater to students’
                    innovative and curious needs and to support young innovators
                    and entrepreneurs in the most compassionate way.
                  </p>
                </div>
              </Fade>
            </Col>
          </Row>
          {other.length !== 0 ? (
            <Tabs
              id="controlled-tab-example"
              activeKey={key}
              onSelect={(key) => setKey(key)}>
              {other.map((item, i) => {
                array = [...array, item['YEAR']]
                let galleryData = item['GALLERY'].split(',')
                if (count(array, item['YEAR']) === 1) {
                  return (
                    <Tab eventKey={item['YEAR']} title={item['YEAR']}>
                      <SingleEventCard
                        key={i}
                        img={item['PHOTO']}
                        title={item['EVENT NAME']}
                        date={item['DATE']}
                        link={item['REGISTERATION LINK']}
                        desc={item['DESCRIPTION']}
                        gallery={galleryData}
                        winner={item['WINNER']}
                        eventType="flagship"
                      />
                    </Tab>
                  )
                } else {
                  return (
                    <Tab eventKey={item['YEAR']}>
                      <SingleEventCard
                        key={i}
                        img={item['PHOTO']}
                        title={item['EVENT NAME']}
                        date={item['DATE']}
                        link={item['REGISTERATION LINK']}
                        desc={item['DESCRIPTION']}
                        winner={item['WINNER']}
                        eventType="flagship"
                        gallery={galleryData}
                      />
                    </Tab>
                  )
                }
              })}
            </Tabs>
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
};;

const mapStateToProps = ({ event }) => ({
  other: event.other,
});

const mapDispatchToProps = (dispatch) => ({
  setOtherEvents: (data) => dispatch(setOtherEvents(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OtherInfo);
