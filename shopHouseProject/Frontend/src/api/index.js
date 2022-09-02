import axios from 'axios';

const API = axios.create({
    baseURL: "http://localhost:8000/shop-house"
})

export const signIn = (formData) => API.post('/user/sign-in', formData);
export const signUp = (formData) => API.post('/user/sign-up', formData);
export const fetchUsers = () => API.get(`/user/all`);


export const fetchItems = () => API.get(`/item`);
export const createItem = (newItem) => API.post(`/item`, newItem);
export const deleteItem = (id) => API.delete(`/item/${id}`);
export const updateItem = (id, updateItem) => API.put(`/item/${id}`, updateItem);


export const fetchPayments = () => API.get(`/payment`);
export const createPayment = (newPayment) => API.post(`/payment`, newPayment);
export const deletePayment = (id) => API.delete(`/payment/${id}`);
export const updatePayment = (id, updatePayment) => API.patch(`/payment/${id}`, updatePayment);

export const fetchTutorials = () => API.get(`/tutorial`);



