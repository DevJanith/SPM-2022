import { combineReducers } from "redux";
import authReducer from "./auth";
import itemReducer from "./item.reducer";
import paymentReducer from "./payment.reducer";
import tutorialReducer from "./tutorial.reducer";
import feedbackReducer from "./feedback.reducer";

export default combineReducers({
  authReducer,
  itemReducer,
  paymentReducer,
  tutorialReducer,
  feedbackReducer,
});
