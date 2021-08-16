import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "./moduleAxios";

// 불편사항
export const suggestComment = createAsyncThunk(
  "suggest/suggestComment",
  async (data, thunkAPI) => {

    const response = await axiosInstance.post(`/api/complaint`, data);
    
    return response.data;
  }
);

// 맥주 추천
export const suggestBeer = createAsyncThunk(
  "/api/suggestBeer",
  async (data, thunkAPI) => {
    
    const response = await axiosInstance.post(`/api/recommendation`, data);
    
  return response.data;
});

//맥주 장소 제보하기
export const mapReport = createAsyncThunk(
  "/api/mapReport",
  async (data, thunkAPI) => {
    
    const response = await axiosInstance.post(`/api/beer/report-location`, data);
    if(response.data.message === "fail"){
      alert("이미 신청한 장소입니다!")
    }else{
      alert("신청이 완료되었습니다!")
    }
    return response.data;
  }
)
