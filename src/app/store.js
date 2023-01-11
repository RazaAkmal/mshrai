import { configureStore } from "@reduxjs/toolkit";
import { blogSliceReducer } from "../features/blog/blogSlice";
import searchReducer from "../features/search/searchSlice";
export const store = configureStore({
  reducer: {
    search: searchReducer,
    blogs: blogSliceReducer
  },
});
