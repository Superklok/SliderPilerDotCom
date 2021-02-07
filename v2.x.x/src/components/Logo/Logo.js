import React from 'react';

import sliderPilerLogo from '../../assets/img/SliderPilerLogo.png';
import classes from './Logo.css';

const logo = (props) => (
	<div className={classes.Logo} style={{height: props.height}}>
		<img src={sliderPilerLogo} alt="Slider Piler" />
	</div>
);

export default logo;