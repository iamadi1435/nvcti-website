import React from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { Fade } from 'react-reveal';
import { useHistory } from "react-router-dom";

const CustomButton = ({text,link}) => {
    const history = useHistory();
    const handleClick = () => history.push(link);
    return (
        <Button onClick={handleClick} className="button mt-2">{text}</Button>
    )
}

const Sponsor = () => {
    return (
        <div className="word-section sponsor">
            <Container>
            <Fade top cascade>
                <Row className="first-row mb-4">
                    <h2 className="header">Help us grow bigger and stronger!</h2>
                </Row>
                <Row className="second-row">
                {
                    data.map((item,ind) => {
                        return <CustomButton text={item.text} link={item.link} key={item+ind} />
                    })
                }
                </Row>
            </Fade>
            </Container>
        </div>
    )
}

export default Sponsor;

const data = [
  {
    text: "Contribute",
    link: "/coming_soon",
  },
  {
    text: "Sponsor Projects",
    link: "/coming_soon",
  },
  {
    text: "Partner With Us",
    link: "/contact",
  },
];
