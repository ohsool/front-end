import { createAsyncThunk } from "@reduxjs/toolkit";
import { nonHeaderAxios } from "./moduleAxios";

// 불편사항
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




