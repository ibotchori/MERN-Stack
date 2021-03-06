/* Making HTTP requests */

import axios from "axios";

// "proxy": "http://localhost:5000" in package,json (not working)
const API_URL = "https://mern-app-goals.herokuapp.com/api/goals/";

// Create new goal (add goals on server)
const createGoal = async (goalData, token) => {
  // set received token to authorization headers
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // api call, pass goal data and config (token)
  const response = await axios.post(API_URL, goalData, config);
  return response.data;
};

// Get user goals (fetch goals from server)
const getGoals = async (token) => {
  // set received token to authorization headers
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // api call, pass config (token)
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Delete user goal (delete goals from server)
const deleteGoal = async (goalId, token) => {
  // set received token to authorization headers
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // api call, pass goal id and config (token)
  const response = await axios.delete(API_URL + goalId, config);
  // return deleted goal id from server
  return response.data;
};

const goalService = {
  createGoal,
  getGoals,
  deleteGoal,
};

export default goalService;
