import { createAsyncThunk } from "@reduxjs/toolkit";
import { headerAxios } from "./moduleAxios";

// 리뷰 작성
export const writeReview = createAsyncThunk(
  "review/writeReview",
  async (data, thunkAPI) => {

    const response = await headerAxios.post(`/api/mybeer`, data);
    
    return response.data;
  }
);

