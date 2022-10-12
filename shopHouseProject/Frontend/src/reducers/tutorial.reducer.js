import { FETCH_ALL } from '../constants/actionTypes.constants';

export default (tutorials = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload; 
        default:
            return tutorials;
    }
};