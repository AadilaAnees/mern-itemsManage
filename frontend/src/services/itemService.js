import axios from "axios";

// =============================================
// TODO (Deployment Step): After deploying your backend,
// replace the localhost URL below with your deployed backend URL.
// Example: const BASE_URL = "https://your-app.onrender.com/api/items";
// =============================================
const BASE_URL = "https://mern-itemsmanage.onrender.com/api/items";

// Get all items
export const fetchItems = () => axios.get(BASE_URL);

// Get single item
export const fetchItem = (id) => axios.get(`${BASE_URL}/${id}`);

// Create item
export const createItem = (data) => axios.post(BASE_URL, data);

// Update item
export const updateItem = (id, data) => axios.put(`${BASE_URL}/${id}`, data);

// Delete item
export const deleteItem = (id) => axios.delete(`${BASE_URL}/${id}`);
