import React from 'react';

import classes from './Slider.css';
import SliderIngredient from './SliderIngredient/SliderIngredient';

const slider = ( props ) => {
	let transformedIngredients = Object.keys(props.ingredients)
		.map(igKey => {
			return [...Array(props.ingredients[igKey])].map((_, i) =>{
				return <SliderIngredient key={igKey + i} type={igKey} />;
			});
		})
		.reduce((arr, el) => {
			return arr.concat(el)
		}, []);

	if (transformedIngredients.length === 0) {
		transformedIngredients = <p>Tell it how it is!</p>
	}
	return (
		<div className={classes.Slider}>
			<SliderIngredient type="bun-top" />
			{transformedIngredients}
			<SliderIngredient type="bun-bottom" />
		</div>
	);
};

export default slider;