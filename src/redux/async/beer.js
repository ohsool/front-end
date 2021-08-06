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
    const beers = thunkAPI.getState().beer.beerList.beers
    const index = beers.findIndex((p)=> p._id === data);
    console.log("like", beers[index].like_array);
    const response = await headerAxios.put(`/api/beer/like/${data}`)
    
    return response.data;
  }
)
export  const unLikeBeer = createAsyncThunk(
  "beer/unLikeBeer",
  async (data, thunkAPI) => {
    const beers = thunkAPI.getState().beer.beerList.beers
    const index = beers.findIndex((p)=> p._id === data);
    const likeList = beers[index].like_array;
    console.log(likeList.indexOf(data));
    const response = await headerAxios.put(`/api/beer/unlike/${data}`)
    
    return response.data;
  }
)
export const getSearchWord = createAsyncThunk(
  "beer/getSearchResult",
  async (data, thunkAPI) => {
    const response = await nonHeaderAxios.get(`/api/search?word=${data}`);
    
    return response.data;
  }
)

export const testResult = createAsyncThunk(
  "beer/testResult",
  async (data, thunkAPI) => {
    
    const response = await nonHeaderAxios.post(`/api/user/test`, data);
    
    return response.data;
  }
)
