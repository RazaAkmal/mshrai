import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getBlogById = createAsyncThunk(
  "blogs/getById",
  async (data, _) => {
    const response = await axios.get(
      `https://admin.mshrai.com/api/posts/${data.id}`
    );
    return response;
  }
);
