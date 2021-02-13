import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Slider from '../../components/Slider/Slider';
import CompilerControls from '../../components/Slider/CompilerControls/CompilerControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Slider/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
	lettuce: 0.75,
	bacon: 1.5,
	cheese: 1.25,
	meat: 2
}

class SliderCompiler extends Component {
	state = {
		ingredients: null,
		totalPrice: 1,
		purchasable: false,
		purchasing: false,
		loading: false,
		error: false
	}

	componentDidMount () {
		console.log(this.props);
		axios.get('https://sliderpilerdotcom-default-rtdb.firebaseio.com/ingredients.json')
			.then(response => {
				this.setState({
					ingredients: response.data
				});
			})
			.catch(error => {
				this.setState({error: true});
			});
	}

	updatePurchaseState (ingredients) {
		const sum = Object.keys(ingredients)
			.map(igKey => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		this.setState({purchasable: sum > 0});
	}

	addIngredientHandler = ( type ) => {
		const oldCount = this.state.ingredients[type];
		const newCount = oldCount + 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = newCount;
		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;
		this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
		this.updatePurchaseState(updatedIngredients);
	}

	removeIngredientHandler = ( type ) => {
		const oldCount = this.state.ingredients[type];
		if (oldCount <= 0) {
			return;
		}
		const newCount = oldCount - 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = newCount;
		const priceDeduction = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceDeduction;
		this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
		this.updatePurchaseState(updatedIngredients);
	}

	purchaseHandler = () => {
		this.setState({purchasing:true});
	}

	purchaseCancelHandler = () => {
		this.setState({purchasing:false});
	}

	purchaseContinueHandler = () => {
		const queryParams = [];
		for (let i in this.state.ingredients) {
			queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
		}
		queryParams.push('price=' + this.state.totalPrice);
		const queryString = queryParams.join('&');
		this.props.history.push({
			pathname: '/checkout',
			search: '?' + queryString
		});
	}

	render () {
		const disabledInfo = {
			...this.state.ingredients
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0
		}
		let orderSummary = null;
		let slider = this.state.error ? <p>Unable to load ingredients!</p> : <Spinner />;
		
		if (this.state.ingredients) {
			slider = (
				<Aux>
					<Slider ingredients={this.state.ingredients} />
					<CompilerControls
						ingredientAdded={this.addIngredientHandler}
						ingredientRemoved={this.removeIngredientHandler}
						disabled={disabledInfo}
						purchasable={this.state.purchasable}
						ordered={this.purchaseHandler}
						price={this.state.totalPrice} />
				</Aux>
			);
			orderSummary = <OrderSummary 
				ingredients={this.state.ingredients}
				price={this.state.totalPrice}
				purchaseCancelled={this.purchaseCancelHandler}
				purchaseContinued={this.purchaseContinueHandler} />;
		}
		if (this.state.loading) {
			orderSummary = <Spinner />;
		}
		return (
			<Aux>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				{slider}
			</Aux>
		);
	}
}

export default withErrorHandler(SliderCompiler, axios);