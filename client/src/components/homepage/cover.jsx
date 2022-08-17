import React from 'react'
import Fade from 'react-reveal/Fade'
import Typed from 'react-typed'

const Cover = () => {
  // const [color, setColor] = useState(0)
  // const colors = ['yellow', 'purple', 'lightgreen', 'red']
  // setInterval(function() {
  //   setColor((color+1)%(colors.length))
  //   document.querySelector('#title-name').style.color = colors[color]
  // }, 1500)
  return (
    <div className="bg-div" id="home">
      <div className="head mx-5">
        <div className="head-div mx-auto main-div">
          <Fade top cascade>
            <section className="div-1">
              <h1 className="head-div-first-text">
                Welcome to <span style={{ fontWeight: 900 }} id={'title-name'}>NVCTI</span>
              </h1>
              <h1 className="head-div-second-text">
                Fostering{' '}
                <Typed
                  strings={['Innovations.','Creativity.', 'Ideas.']}
                  typeSpeed={40}
                  backSpeed={30}
                  loop
                />
              </h1>
              <p className="head-div-third-text">IIT (ISM) Dhanbad</p>
            </section>
          </Fade>
        </div>
      </div>
      <Fade bottom>
        <span className="scroll-btn">
          <span className="mouse">
            <span></span>
          </span>
        </span>
      </Fade>
    </div>
  )
}

export default Cover
