import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseSliderSuccess = (id, orderData) => {
	return {
		type: actionTypes.PURCHASE_SLIDER_SUCCESS,
		orderId: id,
		orderData: orderData
	};
};

export const purchaseSliderFail = (error) => {
	return {
		type: actionTypes.PURCHASE_SLIDER_FAIL,
		error: error
	};
};

export const purchaseSliderStart = () => {
	return {
		type: actionTypes.PURCHASE_SLIDER_START
	};
};

export const purchaseSlider = (orderData) => {
	return dispatch => {
		dispatch(purchaseSliderStart());
		axios.post('/orders.json', orderData)
			.then(response => {
				console.log (response.data);
				dispatch(purchaseSliderSuccess(response.data.name, orderData));
			})
			.catch(error => {
				dispatch(purchaseSliderFail(error));
			});
	};
};

export const purchaseInit = () => {
	return {
		type: actionTypes.PURCHASE_INIT
	};
};

export const fetchOrdersSuccess = (orders) => {
	return {
		type: actionTypes.FETCH_ORDERS_SUCCESS,
		orders: orders
	};
};

export const fetchOrdersFail = (error) => {
	return {
		type: actionTypes.FETCH_ORDERS_FAIL,
		error: error
	};
};

export const fetchOrdersStart = () => {
	return {
		type: actionTypes.FETCH_ORDERS_START
	};
};

export const fetchOrders = () => {
	return dispatch => {
		dispatch(fetchOrdersStart());
		axios.get('/orders.json')
		.then(res => {
			const fetchedOrders = [];
			for (let key in res.data) {
				fetchedOrders.push({
					...res.data[key],
					id: key
				});
			}
			dispatch(fetchOrdersSuccess(fetchedOrders));
		})
		.catch(err => {
			dispatch(fetchOrdersFail(err));
		});
	};
};