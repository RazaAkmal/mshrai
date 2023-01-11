import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const fetchBlogs = createAsyncThunk('blogs/fecth', async () => {
  const response = await axios.get("https://admin.mshrai.com/api/posts")
  // console.log("res", response);
  return response
})
