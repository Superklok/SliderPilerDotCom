import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactInfo.css';
import axios from '../../../axios-orders';

class ContactInfo extends Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			postalCode: ''
		},
		loading: false
	}

	orderHandler = (event) => {
		event.preventDefault();
		this.setState({loading: true});
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			customer: {
				name: 'Trev Morin',
				address: {
					street: '1 Sample Street',
					postalCode: 'T3ST3R',
					country: 'Canada'
				},
				email: 'trev@superklok.com'
			},
			deliveryMethod: 'priority'
		}
		axios.post('/orders.json', order)
			.then(response => {
				this.setState({loading: false});
				this.props.history.push('/');
			})
			.catch(error => {
				this.setState({loading: false});
			});
	}

	render () {
		let form = (
			<form>
				<input className={classes.Input} type="text" name="name" placeholder='Your name' />
				<input className={classes.Input} type="email" name="email" placeholder='Your email' />
				<input className={classes.Input} type="text" name="street" placeholder='Street' />
				<input className={classes.Input} type="text" name="postal" placeholder='Postal code' />
				<Button btnType="Success" clicked={this.orderHandler}>Order Now</Button>
			</form>
		);
		if (this.state.loading) {
			form = <Spinner />;
		}
		return(
			<div className={classes.ContactInfo}>
				<h4>Please enter your contact info</h4>
				{form}
			</div>
		);
	}
}

export default ContactInfo;