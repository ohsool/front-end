import { createAsyncThunk } from "@reduxjs/toolkit";
import { headerAxios, nonHeaderAxios } from "./moduleAxios";

export const getAllBeer = createAsyncThunk(
  "beer/getAllBeer",
  async (data, thunkAPI) => {
    const response = await nonHeaderAxios.get(`/api/beer/list`);
    return response.data;
  }
);

export const getOneBeer = createAsyncThunk(
    "beer/getOneBeer",
    async (data, thunkAPI) => {
    const response = await nonHeaderAxios.get(`/api/beer/list/${data}`);
    return response.data;
    }
);

export  const likeBeer = createAsyncThunk(
  "beer/likeBeer",
  async (data, thunkAPI) => {
    const response = await headerAxios.put(`/api/beer/like/${data}`)
    console.log("like", response);
    return response;
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
    const response = await nonHeaderAxios.get(`/api/search?word=${data}`);
    return response.data;
  }
)
