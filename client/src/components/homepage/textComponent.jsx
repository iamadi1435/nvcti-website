import React from 'react';
import { Row, Col } from 'react-bootstrap';
import {Fade} from 'react-reveal';

const TextComponent = ({heading,text,img,alt,lazy}) => {
    return (
		<Fade>
			<div>
				<Row>
					<Col>
						<h2 className="heading">{heading}</h2>
					</Col>
				</Row>
				<Fade>
				<Row>
					<Col md={6} lg={9} sm={12} xs={12}>
						<p className="text" style={{ textAlign: 'justify' }} >{text}</p>
					</Col>
					<Col md={6} lg={3} sm={12} xs={12}>
						<img src={img} className="word-image" alt={alt} loading={lazy?'lazy':'auto'}/>
					</Col>
				</Row>
				</Fade>
			</div>
		</Fade>
    )
}

export default TextComponent;
