import { createAsyncThunk } from "@reduxjs/toolkit";
import { headerAxios, nonHeaderAxios } from "./moduleAxios";

// 불편사항
export const suggestComment = createAsyncThunk(
  "suggest/suggestComment",
  async (data, thunkAPI) => {
    const response = await nonHeaderAxios.post(`/api/complaint`, data);  
    return response.data;
  }
);

// 맥주 추천
export const suggestBeer = createAsyncThunk(
  "/api/suggestBeer",
  async (data, thunkAPI) => {
    const response = await nonHeaderAxios.post(`api/recommendation`, data);
  return response.data;
});
