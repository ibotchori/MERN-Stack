import axios from "axios";

// "proxy": "http://localhost:5000" in package,json
const API_URL = "http://localhost:5000/api/users/";

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  // Save response from backend to local storage
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
};

export default authService;
