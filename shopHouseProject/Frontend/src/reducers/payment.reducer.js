import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes.constants';

export default (payments = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...payments, action.payload];
        case UPDATE:
            return payments.map((payment) => (payment.id === action.payload.id ? action.payload : payment));
        case DELETE:
            return payments.filter((payment) => payment.id !== action.payload);
        default:
            return payments;
    }
};