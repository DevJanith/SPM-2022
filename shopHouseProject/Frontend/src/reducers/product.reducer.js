import {
  CREATE,
  DELETE,
  FETCH_ALL,
  FETCH_ONE,
  REPORT,
  UPDATE,
} from "../constants/actionTypes.constants";

export default (products = [], action) => {
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
      return products.map((product) =>
        (product.id === action.payload.id ? action.payload : product));
    case DELETE:
      return products.filter((product) => product._id !== action.payload);
    default:
      return products;
  }
};
