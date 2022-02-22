/* Making HTTP requests */

import axios from "axios";

// "proxy": "http://localhost:5000" in package,json (not working)
const API_URL = "https://mern-app-goals.herokuapp.com/api/users/";

// Register user
const register = async (userData) => {
  // api call
  const response = await axios.post(API_URL, userData);

  // Save response from backend to local storage
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// login user
const login = async (userData) => {
  // api call
  const response = await axios.post(API_URL + "login", userData);

  // Save response from backend to local storage
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  // remove user from local storage
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
