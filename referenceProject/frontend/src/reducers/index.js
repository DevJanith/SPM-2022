import { combineReducers } from "redux";
import authReducer from "./auth";
import itemReducer from "./item.reducer";
import paymentReducer from "./payment.reducer";


export default combineReducers({
    authReducer,
    itemReducer,
    paymentReducer
})