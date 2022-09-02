import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes.constants';

import * as api from '../api/index.js';

export const getPayments = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPayments();

        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const createPayment = (Payment, id) => async (dispatch) => {
    try { 
        console.log(Payment)
        const { data } = await api.createPayment(Payment);

        dispatch({ type: CREATE, payload: data });

        // navigate('/dashboard/Payment', { replace: true });
    } catch (error) {
        console.log(error.message);
    }
};

export const updatePayment = (id, Payment) => async (dispatch) => {
    try {
        const { data } = await api.updatePayment(id, Payment);

        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const deletePayment = (id) => async (dispatch) => {
    try {
        await api.deletePayment(id);

        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error.message);
    }
};