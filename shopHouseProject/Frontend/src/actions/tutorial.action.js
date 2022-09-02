import { FETCH_ALL } from '../constants/actionTypes.constants';

import * as api from '../api/index.js';

export const getTutorials = () => async (dispatch) => {
    try {
        const { data } = await api.fetchTutorials(); 
        
        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}; 