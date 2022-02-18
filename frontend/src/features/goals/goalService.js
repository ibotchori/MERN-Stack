/* Making HTTP requests */

import axios from "axios";

// "proxy": "http://localhost:5000" in package,json (not working)
const API_URL = "http://localhost:5000/api/goals/";

// Create new goal
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

const goalsService = {
  createGoal,
};

export default goalsService;
