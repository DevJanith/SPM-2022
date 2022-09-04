import {
  CREATE,
  DELETE,
  FETCH_ALL,
  FETCH_ONE,
  REPORT,
  UPDATE,
} from "../constants/actionTypes.constants";

export default (feedbacks = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case FETCH_ONE:
      return action.payload;
    case REPORT:
      return action.payload;
    case CREATE:
      return action.payload;
    case UPDATE:
      return feedbacks.map((feedback) =>
        feedback.id === action.payload.id ? action.payload : feedback
      );
    case DELETE:
      return feedbacks.filter((feedback) => feedback.id !== action.payload);
    default:
      return feedbacks;
  }
};
