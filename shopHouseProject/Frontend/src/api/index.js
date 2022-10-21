import axios from "axios";

const ReferenceAPI = axios.create({
  baseURL: "http://localhost:8000"
})
// const APIPayment = axios.create({
//   baseURL: "http://localhost:5000"
// })
// const ShopHouseAPI = axios.create({
//   baseURL: "http://localhost:5000/shop-house"
// })

const ShopHouseAPI = axios.create({
  baseURL: "https://shop-house-eca5b0c5-2934-4483.herokuapp.com/shop-house"
})
const APIPayment = axios.create({
  baseURL: "https://shop-house-eca5b0c5-2934-4483.herokuapp.com/shop-house"
})

export const signIn = (formData) => ShopHouseAPI.post("/user/sign-in", formData);
export const signUp = (formData) => ShopHouseAPI.post("/user/sign-up", formData);
export const fetchUsers = () => ShopHouseAPI.get(`/user/all`);
export const fetchUser = (id) => ShopHouseAPI.get(`/user/${id}`);
export const fetchUserAccordingTopType = (userType) => ShopHouseAPI.get(`/user/${userType}`);
export const userUpdate = (id, data) => ShopHouseAPI.put(`/user/${id}`, data);
export const userDelete = (id) => ShopHouseAPI.delete(`/user/${id}`);

export const fetchItems = () => ShopHouseAPI.get("/item");
export const createItem = (newItem) => ShopHouseAPI.post("/item", newItem);
export const deleteItem = (id) => ShopHouseAPI.delete(`/item/${id}`);
export const updateItem = (id, newItem) => ShopHouseAPI.patch(`/item/${id}`, newItem);
export const getoneItem = (id) => ShopHouseAPI.get(`item/${id}`);
export const getItemReport = (filter) => ShopHouseAPI.post("/item/report", filter);

export const fetchFeedbacks = () => ShopHouseAPI.get("/feedback");
export const createFeedback = (newFeedback) => ShopHouseAPI.post("/feedback", newFeedback);
export const deleteFeedback = (id) => ShopHouseAPI.delete(`/feedback/${id}`);
export const updateFeedback = (id, newFeedback) => ShopHouseAPI.put(`/feedback/${id}`, newFeedback);
export const getOneFeedback = (id) => ShopHouseAPI.get(`feedback/${id}`);
export const getFeedbackReport = (filter) => ShopHouseAPI.post("/feedback/report", filter);

export const fetchProducts = () => ShopHouseAPI.get(`/product`);
export const fetchOneProduct = (id) => ShopHouseAPI.get(`/product/${id}`);
export const createProduct = (newProduct) => ShopHouseAPI.post(`/product`, newProduct);
export const deleteProduct = (id) => ShopHouseAPI.delete(`/product/${id}`);
export const updateProduct = (id, newProduct) => ShopHouseAPI.put(`/product/${id}`, newProduct);
export const getProductReport = (filter) => ShopHouseAPI.post("/product/report", filter);

export const payment = (data) => APIPayment.post("/payment", data)
export const fetchTutorials = () => ShopHouseAPI.get(`/tutorial`);

export const fetchPayments = () => ReferenceAPI.get(`/payment`);
export const createPayment = (newPayment) => ReferenceAPI.post(`/payment`, newPayment);
export const deletePayment = (id) => ReferenceAPI.delete(`/payment/${id}`);
export const updatePayment = (id, updatePayment) => ReferenceAPI.patch(`/payment/${id}`, updatePayment);
