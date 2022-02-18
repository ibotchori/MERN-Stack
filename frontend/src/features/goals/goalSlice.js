/* Redux tool kit */

// createAsyncThunk for working with async data
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

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
