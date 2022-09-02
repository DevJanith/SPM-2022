import { FETCH_ALL } from '../constants/actionTypes.constants';

export default (tutorial = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload; 
        default:
            return tutorial;
    }
};