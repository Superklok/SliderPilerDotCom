import React from 'react';

import classes from './OrderSummary.css';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
	const ingredientSummary = Object.keys(props.ingredients)
		.map(igKey => {
			return (
				<li key={igKey}>
					<span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
				</li>
			);
		});
	return (
		<Aux>
			<h3>Order Summary</h3>
			<p>A signature slider with the following ingredients:</p>
			<ul>
				{ingredientSummary}
			</ul>
			<p>
				<span>Total </span>
				<span className={classes.PriceLabel}>Price: </span>CA$
				<span className={classes.Price}> {props.price.toFixed(2)}</span>
			</p>
			<p>Proceed to checkout?</p>
			<Button btnType="Danger" clicked={props.purchaseCancelled}>Cancel</Button>
			<Button btnType="Success" clicked={props.purchaseContinued}>Continue</Button>
		</Aux>
	);
};

export default OrderSummary;