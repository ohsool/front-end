import { createAsyncThunk } from "@reduxjs/toolkit";
import { headerAxios, nonHeaderAxios } from "./moduleAxios";

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

    const response = await nonHeaderAxios.get(`/api/beer/${data}`);
    
    return response.data;
    }
);

export  const likeBeer = createAsyncThunk(
  "beer/likeBeer",
  async (data, thunkAPI) => {

    const response = await headerAxios.put(`/api/beer/like/${data}`)
    console.log("like", response.data);
    return response.data;
  }
)
export  const unLikeBeer = createAsyncThunk(
  "beer/unLikeBeer",
  async (data, thunkAPI) => {
    
    const response = await headerAxios.put(`/api/beer/unlike/${data}`)
    console.log("unlike", response.data);
    return response.data;
  }
)

//추가된 코드
//맥주 검색
export const searchReview = createAsyncThunk(
  "beer/searchReview",
  async (data, thunkAPI) => {
    const response = await nonHeaderAxios.post(`/api/beer/search`, data);
    return response.data;
  }
)
