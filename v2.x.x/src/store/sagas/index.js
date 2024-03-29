import {takeEvery, all, takeLatest} from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import {initIngredientsSaga} from './sliderCompiler';
import {fetchOrdersSaga, purchaseSliderSaga} from './order';
import {
	logoutSaga, 
	checkAuthTimeoutSaga, 
	authUserSaga, 
	authCheckStateSaga 
} from './auth';

export function* watchAuth() {
	yield all([
		takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
		takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
		takeEvery(actionTypes.AUTH_USER, authUserSaga),
		takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
	]);
}

export function* watchSliderCompiler() {
	yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrder() {
	yield takeLatest(actionTypes.PURCHASE_SLIDER, purchaseSliderSaga);
	yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
}