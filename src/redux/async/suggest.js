import { createAsyncThunk } from "@reduxjs/toolkit";
import { suggestAxios } from "./moduleAxios";

// 불편사항
export const suggestComment = createAsyncThunk(
  "suggest/suggestComment",
  async (data, thunkAPI) => {

    const response = await suggestAxios.post(`/api/complaint`, data);
    
    return response.data;
  }
);

// 맥주 추천
export const suggestBeer = createAsyncThunk("/api/recommendation",
async (data, thunkAPI) => {
    console.log("beer action", data);
    // const response = await suggestAxios.post(`api/user/auth`, data);

  return ;
});
