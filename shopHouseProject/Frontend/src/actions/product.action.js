import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes.constants';

import * as api from '../api/index.js';

//get All Products
export const getProducts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchProducts(); 
        
        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

//Get one Prodcut by ID
export const getProduct = (id) => async (dispatch) => {
    try {
        const { data } = await api.fetchOneProduct(id); 
        
        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

//create a product
export const createProduct = (product) => async (dispatch) => {
    try {
        const { data } = await api.createProduct(product);

        dispatch({ type: CREATE, payload: data });

        // navigate('/dashboard/item', { replace: true });
    } catch (error) {
        console.log(error.message);
    }
};

//update a product
export const updateProduct = (id, product) => async (dispatch) => {
    try {
        const { data } = await api.updateProduct(id, product);

        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

//delete a product
export const deleteProduct = (id) => async (dispatch) => {
    try {
        await api.deleteProduct(id);

        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error.message);
    }
};