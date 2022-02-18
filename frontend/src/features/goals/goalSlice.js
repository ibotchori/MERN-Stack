/* Redux tool kit */

// createAsyncThunk for working with async data
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import goalsService from "./goalService";

const initialState = {
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new goal
export const createGoal = createAsyncThunk(
  "goals/createGoal", // <-- action
  async (goalData, thunkAPI) => {
    try {
      // get token from global state
      const token = thunkAPI.getState().auth.user.token;
      // api call (from goalsService file) and pass entered data and token
      return await goalsService.createGoal(goalData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      // thunkAPI shows the error message as the payload
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create goal slice
export const goalSlice = createSlice({
  name: "goal",
  initialState,
  reducers: {
    // Reset action <-- to reset global state
    reset: (state) => initialState,
  },
});

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
