import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactInfo from './ContactInfo/ContactInfo';

class Checkout extends Component {
	state = {
		ingredients: null,
		price:0
	}

	mySetState = (ingredients, price) => {
		this.setState({ingredients: ingredients, totalPrice: price});
	}

	componentDidMount() {
		const query = new URLSearchParams(this.props.location.search);
		const ingredients = {};
		let price = 0;
		for (let param of query.entries()) {
			if (param[0] === 'price') {
				price = param[1];
			} else { ingredients[param[0]] = +param[1]; }
		}
		this.mySetState(ingredients, price);
	}

	checkoutCancelledHandler = () => {
		this.props.history.goBack();
	}

	checkoutContinuedHandler = () => {
		this.props.history.replace('/checkout/contact-info');
	}

	render () {
		return (
			<div>
				{this.state.ingredients && (
					<div>
						<CheckoutSummary
							ingredients={this.state.ingredients}
							checkoutCancelled={this.checkoutCancelledHandler}
							checkoutContinued={this.checkoutContinuedHandler}
						/>
						<Route 
							path={this.props.match.path + '/contact-info'} 
							render={(props) => (
								<ContactInfo
									ingredients={this.state.ingredients}
									price={this.state.totalPrice}
									{...props}
								/>
							)}
						/>
					</div>
				)}
			</div>
		);
	}
}

export default Checkout;