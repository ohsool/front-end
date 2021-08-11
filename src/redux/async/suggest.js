import { createAsyncThunk } from "@reduxjs/toolkit";
import { headerAxios, nonHeaderAxios } from "./moduleAxios";

// 불편사항
export const suggestComment = createAsyncThunk(
  "suggest/suggestComment",
  async (data, thunkAPI) => {

    const response = await headerAxios.post(`/api/complaint`, data);
    
    return response.data;
  }
);

// 맥주 추천
export const suggestBeer = createAsyncThunk(
  "/api/suggestBeer",
  async (data, thunkAPI) => {

    const response = await headerAxios.post(`/api/recommendation`, data);

  return response.data;
});

//맥주 장소 제보하기
export const mapReport = createAsyncThunk(
  "/api/mapReport",
  async (data, thunkAPI) => {
    
    const response = await nonHeaderAxios.post(`/api/beer/report-location`, data);
    
    return response.data;
  }
)
