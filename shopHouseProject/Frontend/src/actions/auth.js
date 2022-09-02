import * as api from '../api';
import { FETCH_ALL } from '../constants/actionTypes.constants';

export const signIn = (formData, navigate) => async (dispatch) => {
    try {
        //log in user...
        const { data } = await api.signIn(formData);

        dispatch({ type: 'AUTH', data })

        navigate('/dashboard/app', { replace: true });
        // navigate('/')
    } catch (error) {
        console.log(error.message)
    }
}

export const signUp = (formData, navigate) => async (dispatch) => {
    try {
        //log up user...
        const { data } = await api.signUp(formData);

        dispatch({ type: 'AUTH', data })

        navigate('/dashboard/app', { replace: true });

        // navigate('/')
    } catch (error) {
        console.log(error.message)
    }
}


export const getUsers = () => async (dispatch) => {
    try {
        const { data } = await api.fetchUsers();

        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const addToLocalStorage = (cartData, total) => async (dispatch) => {
    try {
        //log in user...
        const data = {
            cartData,
            total
        }

        dispatch({ type: 'ADDLOCALSTORAGE', data }) 
        // navigate('/')
    } catch (error) {
        console.log(error.message)
    }
}