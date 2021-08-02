import { createAsyncThunk } from "@reduxjs/toolkit";
import { nonHeaderAxios } from "./moduleAxios";

export const getAllBeer = createAsyncThunk(
  "beer/getAllBeer",
  async (data, thunkAPI) => {

    const response = await nonHeaderAxios.get(`/api/beer`);
    
    return response.data;
  }
);

export const getOneBeer = createAsyncThunk(
    "beer/getOneBeer",
    async (data, thunkAPI) => {
    const response = await nonHeaderAxios.get(`/api/beer/:beerId`);
    return response.data;
    }
);

//추가된 코드
//맥주 검색
export const searchReview = createAsyncThunk(
  "beer/searchReview",
  async (data, thunkAPI) => {
    const response = await nonHeaderAxios.post(`/api/beer/search`, data);
    return response.data;
  }
)
