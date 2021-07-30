import { createAsyncThunk } from "@reduxjs/toolkit";
import { headerAxios, nonHeaderAxios } from "./moduleAxios";

// 비어카테고리 가져오기
export const getCategory = createAsyncThunk(
  "category/getCategory",
  async (data, thunkAPI) => {
    console.log("BeerCategory data", data)
    const response = await nonHeaderAxios.post(`/api/beerCategory`, data);
    console.log(response)

    //return response.data.result;
  }
);

/*
export const getBeer = createAsyncThunk(
    "user/logIn", 
    async (data, thunkAPI) => {
    console.log("Login data", data)
    const response = await nonHeaderAxios.post(`api/user/auth`, data);
    console.log("Login response", response.data);
  return response.data;
});
*/