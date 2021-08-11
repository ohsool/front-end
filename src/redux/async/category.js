import { createAsyncThunk } from "@reduxjs/toolkit";
import { headerAxios, nonHeaderAxios } from "./moduleAxios";

// 맥주 카테고리별 정보 가져오기
export const getCategory = createAsyncThunk(
  "category/getCategory",
  async (data, thunkAPI) => {

    const response = await nonHeaderAxios.get(`/api/beerCategory`, data);

    return response.data;
  }
);
//특정 카테고리 맥주 가져오기 
export const getCategoryBeer = createAsyncThunk(
    "category/getCategoryBeer",
    async (data, thunkAPI) => {
      
    const response = await nonHeaderAxios.get(`/api/beerCategory/${data}`);
    
  return response.data;
});
