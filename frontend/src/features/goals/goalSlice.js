/* Redux tool kit */

// createAsyncThunk for working with async data
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import goalService from "./goalService";

const initialState = {
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new goal
export const createGoal = createAsyncThunk(
  "goals/create", // <-- action
  async (goalData, thunkAPI) => {
    try {
      // get token from global state
      const token = thunkAPI.getState().auth.user.token;
      // api call (from goalsService file) and pass entered data and token
      return await goalService.createGoal(goalData, token);
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
  extraReducers: (builder) => {
    // Redux Actions
    builder
      // change state by actions (when createGoal action is pending)
      .addCase(createGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // push new goal on global state
        state.goals.push(action.payload);
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
