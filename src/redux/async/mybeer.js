import { createAsyncThunk } from "@reduxjs/toolkit";
import { headerAxios} from "./moduleAxios";

//좋아요한 도감 가지고 오기
export const getMyDogam = createAsyncThunk(
  "mybeer/getMyDogam",
  async (data, thunkAPI) => {
    //const response = await headerAxios.get(`/api/백 작업중..`, data);
    //return response.data;
  }
);

// review 목록 가지고오기
export const getMyReview = createAsyncThunk(
    "mybeer/getMyReview", 
    async (data, thunkAPI) => {
    const response = await headerAxios.get(`/api/mybeer/my`, data);
    
  return response.data;
});
