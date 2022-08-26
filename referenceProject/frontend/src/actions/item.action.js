import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes.constants';

import * as api from '../api/index.js';

export const getItems = () => async (dispatch) => {
    try {
        const { data } = await api.fetchItems(); 
        
        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const createItem = (Item) => async (dispatch) => {
    try {
        const { data } = await api.createItem(Item);

        dispatch({ type: CREATE, payload: data });

        // navigate('/dashboard/item', { replace: true });
    } catch (error) {
        console.log(error.message);
    }
};

export const updateItem = (id, Item) => async (dispatch) => {
    try {
        const { data } = await api.updateItem(id, Item);

        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const deleteItem = (id) => async (dispatch) => {
    try {
        await api.deleteItem(id);

        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error.message);
    }
};