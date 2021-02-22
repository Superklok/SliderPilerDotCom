import React from 'react';

import classes from './Order.css';

const order = (props) => {
	const ingredients = [];

	for (let ingredientName in props.ingredients) {
		ingredients.push(
			{
				name: ingredientName, 
				amount: props.ingredients[ingredientName]
			}
		)
	}

	const ingredientOutput = ingredients.map(ig => {
		return <span 
			style={{
				textTransform: 'capitalize',
				display: 'inline-block',
				margin: '9px',
				padding: '5px',
				backgroundColor: '#74C9D3',
				boxShadow: 'inset 0 0 10px #A1DAE1, 0 0 10px #74C9D3'
			}}
			key={ig.name}>{ig.name} ({ig.amount})</span>;
	});

	return (
		<div className={classes.Order}>
			<p>Ingredients: {ingredientOutput}</p>
			<p>Price: CA$ {Number.parseFloat(props.price).toFixed(2)}</p>
		</div>
	);
};

export default order;