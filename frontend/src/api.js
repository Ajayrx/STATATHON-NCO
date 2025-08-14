// frontend/src/api.js

// Use Vite environment variable
export const API_BASE_URL = import.meta.env.VITE_API_URL;

// Example function for API calls
import axios from "axios";

export const fetchSearchResults = async (query) => {
  const response = await axios.get(`${API_BASE_URL}/api/v1/search?query=${query}`);
  return response.data;
};
