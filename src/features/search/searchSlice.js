import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchInputs: {
    marksOptions: [],
    modelOptions: [],
    cityOptions: [],
    shapes: [],
  },
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    getSearchInputs: (state, action) => {
      state.searchInputs = action.payload;
    },
  },
});

export const { getSearchInputs } = searchSlice.actions;

export default searchSlice.reducer;
