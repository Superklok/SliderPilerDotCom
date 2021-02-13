import React, { Component } from 'react';

import classes from './OrderSummary.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
	componentDidUpdate() {
		console.log('[OrderSummary] WillUpdate');
	}

	render () {
		const ingredientSummary = Object.keys(this.props.ingredients)
		.map(igKey => {
			return (
				<li key={igKey}>
					<span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
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
					Total Price: CA$
					<span className={classes.Price}> {this.props.price.toFixed(2)}</span>
				</p>
				<p>Proceed to checkout?</p>
				<Button btnType="Danger" clicked={this.props.purchaseCancelled}>Cancel</Button>
				<Button btnType="Success" clicked={this.props.purchaseContinued}>Continue</Button>
			</Aux>
		);
	}
}

export default OrderSummary;