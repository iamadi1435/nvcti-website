import React, { useState } from 'react'
import LazyLoad from 'react-lazyload'
import OwlCarousel from 'react-owl-carousel'
import { Container } from 'react-bootstrap'
import { useMediaQuery } from 'react-responsive'
import { Fade } from 'react-reveal'
import { Link } from 'react-router-dom'
import Loader from '../common/loader'

/**
 * @param {Array<string>} navText
 * @param {string} title
 * @param {Array<object>} items
 * @param {boolean} lazy
 * @param {string} subpath /sub/path
 * @param alt
 * @return {JSX.Element}
 * @constructor
 */
const GenericImageSlider = ({ navText, title, items, lazy , subpath = '/', alt = 'A generic image' }) => {
  const [its] = useState(items)

  const isDesktop = useMediaQuery({
    query: '(min-device-width: 992px)',
  })

  const isTablet = useMediaQuery({
    query: '(min-device-width: 767px)',
  })

  return (
    <div className="word-section slider justify-align-center">
      <Fade>
        <h2 className="mb-5" style={{ flexDirection: 'row' }}>
          {title}
        </h2>
      </Fade>
      <Container>
        {its.length !== 0 ? (
          <Fade>
            <OwlCarousel
              id="carousel"
              className="owl-theme news"
              responsiveClass={true}
              items={isDesktop ? 3 : isTablet ? 2 : 1}
              loop={true}
              nav={true}
              navText={navText}
              autoplay={true}
              autoplayTimeout={9000}
              smartSpeed={2000}
              dots={false}
              animateIn="ease-in"
            >
              {its.map((item, ind) => {
                return (
                  <Link to={subpath} style={{ height: '100%' }} key={item + ind}>
                    <figure className="article" style={{ height: '270px' }}>
                      <LazyLoad once={true} placeholder={<Loader variant="dark"/>}>
                        <img
                          src={(item['photo'])}
                          alt={alt}
                          style={{ height: '100%', width: '98%', cursor: 'pointer', position: 'static' }}
                          loading={lazy ? 'lazy' : 'auto'}
                        />
                      </LazyLoad>
                      <figcaption>
                        <div>
                          <h5>{item['heading']}</h5>
                          <h6>{item['subheading']}</h6>
                        </div>
                      </figcaption>
                    </figure>
                  </Link>
                )
              })}
            </OwlCarousel>
          </Fade>
        ) : (
          <div style={{ marginTop: '100px' }} className="justify-align-center">
            <Loader variant="dark" message="Hold on a little 😃, we're getting the information!" extraStyle={{ fontSize: '20px' }}/>
          </div>
        )}
      </Container>
    </div>
  )
}

export default GenericImageSlider
