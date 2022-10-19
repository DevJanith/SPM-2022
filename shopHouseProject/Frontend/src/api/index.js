import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000"
})

const ShopHouseAPI = axios.create({
  baseURL: "http://localhost:5000/shop-house"
})

// export const signIn = (formData) => API.post("/user/sign-in", formData);
// export const signUp = (formData) => API.post("/user/sign-up", formData);
// export const fetchUsers = () => API.get(`/user`);

export const signIn = (formData) => ShopHouseAPI.post("/user/sign-in", formData);
export const signUp = (formData) => ShopHouseAPI.post("/user/sign-up", formData); 
export const fetchUsers = () => ShopHouseAPI.get(`/user/all`);
export const fetchUser = (id) => ShopHouseAPI.get(`/user/${id}`);
export const fetchUserAccordingTopType = (userType) => ShopHouseAPI.get(`/user/${userType}`);


// export const fetchItems = () => API.get(`/item`);
// export const createItem = (newItem) => API.post(`/item`, newItem);
// export const deleteItem = (id) => API.delete(`/item/${id}`);
// export const updateItem = (id, updateItem) => API.put(`/item/${id}`, updateItem);

export const fetchItems = () => ShopHouseAPI.get("/item");
export const createItem = (newItem) => ShopHouseAPI.post("/item", newItem);
export const deleteItem = (id) => ShopHouseAPI.delete(`/item/${id}`);
export const updateItem = (id, newItem) => ShopHouseAPI.patch(`/item/${id}`, newItem);
export const getoneItem = (id) => ShopHouseAPI.get(`item/${id}`);

export const fetchPayments = () => API.get(`/payment`);
export const createPayment = (newPayment) => API.post(`/payment`, newPayment);
export const deletePayment = (id) => API.delete(`/payment/${id}`);
export const updatePayment = (id, updatePayment) => API.patch(`/payment/${id}`, updatePayment);

//feedbacks
export const fetchFeedbacks = () => ShopHouseAPI.get("/feedback");
export const createFeedback = (newFeedback) => ShopHouseAPI.post("/feedback", newFeedback);
export const deleteFeedback = (id) => ShopHouseAPI.delete(`/feedback/${id}`);
export const updateFeedback = (id, newFeedback) => ShopHouseAPI.put(`/feedback/${id}`, newFeedback);
export const getOneFeedback = (id) => ShopHouseAPI.get(`feedback/${id}`);
export const getFeedbackReport = (filter) => ShopHouseAPI.post("/feedback/report", filter);


export const fetchTutorials = () => ShopHouseAPI.get(`/tutorial`);

//product
export const fetchProducts = () => ShopHouseAPI.get(`/product`);
export const fetchOneProduct = (id) => ShopHouseAPI.get(`/product/${id}`);
export const createProduct = (newProduct) => 
  ShopHouseAPI.post(`/product`, newProduct);
export const deleteProduct = (id) => ShopHouseAPI.delete(`/product/${id}`);
export const updateProduct = (id, newProduct) =>
  ShopHouseAPI.put(`/product/${id}`, newProduct);
export const getProductReport = (filter) => ShopHouseAPI.post("/product/report", filter);
