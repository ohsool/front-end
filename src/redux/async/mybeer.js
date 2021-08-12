import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "./moduleAxios";

//좋아요한 도감 가지고 오기
export const getMyDogam = createAsyncThunk(
  "mybeer/getMyDogam",
  async (data, thunkAPI) => {

    const response = await axiosInstance.get(`/api/beer/liked`);

    return response.data;
  }
);

// review 목록 가지고오기
export const getMyReview = createAsyncThunk(
    "mybeer/getMyReview", 
    async (data, thunkAPI) => {

    const response = await axiosInstance.get(`/api/mybeer/my`);
    
  return response.data;
});
