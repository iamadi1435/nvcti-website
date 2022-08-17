import React, { lazy, Suspense } from 'react'
import Loader from '../common/loader'
import { Container } from 'react-bootstrap'
// import DirectorImg from '../../assets/background/director.jpg';
import NareshJiImg from '../../assets/background/Naresh_Vashisht_Ji-without-bg.png'

const TextComponent = lazy(() => import('./textComponent'))

const WordSection = () => {
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
      {data.map((item, ind) => {
        return (
          <section className="word-section" key={item + ind}>
            <Container>
              <TextComponent
                key={ind + item}
                heading={item.heading}
                alt={item.alt}
                img={item.img}
                text={item.text}
                lazy={true}
              />
            </Container>
          </section>
        )
      })}
    </Suspense>
  )
}

export default WordSection

const data = [
  {
    text: 'Shri Naresh Vashisht, ISM alumni class of Petroleum Engineering 1967, is the founder and currently the President of Omimex Resources Inc. Texas, USA. Despite facing a lot of hardships right from his childhood, it was his will to learn and a sharp mind that landed him at our prestigious institution and helped him in his lifetime of astounding success. Mr Vashisht made a generous and selfless donation to our college as he helped in the establishment of our first tinkering and innovation lab, NVCTI, which is named after him. He believes it is his payback and contribution to the institute that laid the groundwork for shaping him into who he was today. His valuable message for the students: “All you have to do is give your best and do not worry about the results. The result is anyway beyond your control, so there is no point worrying about that. Just put in your sincere effort and give your best.”',
    heading: 'OUR BENEFACTOR: SHRI NARESH VASHISHT JI',
    img: NareshJiImg,
    alt: 'benefactor_image'
  }
]
