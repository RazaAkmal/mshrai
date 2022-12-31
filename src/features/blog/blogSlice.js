import { createSlice } from "@reduxjs/toolkit";

import { fetchBlogs } from "./thunks/fetchBlogs";
import { getBlogById } from "./thunks/getBlogById";

const initialState = {
  data: [],
  error: null,
  isLoading: false,
  specificById: null,
  errorSpecificById: null,
  isLoadingSpecificById: null,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchBlogs.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchBlogs.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
    },
    [fetchBlogs.rejected]: (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.error = action.error;
    },
    [getBlogById.pending]: (state, action) => {
      state.isLoadingSpecificById = true;
    },
    [getBlogById.fulfilled]: (state, action) => {
      state.isLoadingSpecificById = false;
      state.specificById = action.payload.data;
    },
    [getBlogById.rejected]: (state, action) => {
      state.isLoadingSpecificById = false;
      state.errorSpecificById = action.error;
    },
  },
});

export * from "./thunks/fetchBlogs";
export * from "./thunks/getBlogById";

export const blogSliceReducer = blogSlice.reducer;
