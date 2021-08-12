import { createAsyncThunk } from "@reduxjs/toolkit";
import { headerAxios, nonHeaderAxios } from "./moduleAxios";

//모든 맥주 정보 가지고 오기
export const getAllBeer = createAsyncThunk(
  "beer/getAllBeer",
  async (data, thunkAPI) => {
    const response = await nonHeaderAxios.get(`/api/beer/list/${data}`);
    
    return response.data;
  }
);

//특정 맥주 정보 가지고 오기
export const getOneBeer = createAsyncThunk(
    "beer/getOneBeer",
    async (data, thunkAPI) => {

    const response = await nonHeaderAxios.get(`/api/beer/list/${data}`);

    return response.data;
    }
);

//특정 맥주 좋아요 적용
export  const likeBeer = createAsyncThunk(
  "beer/likeBeer",
  async (data, thunkAPI) => {
    const beers = thunkAPI.getState().beer.beerList.beers
    const index = beers.findIndex((p) => p._id === data);

    const response = await headerAxios.put(`/api/beer/like/${data}`)
    const like_Data = {
      index: index,
      response: response.data
    }
    return like_Data;
  }
);

//특정 맥주 좋아요 취소
export  const unLikeBeer = createAsyncThunk(
  "beer/unLikeBeer",
  async (data, thunkAPI) => {
    const beers = thunkAPI.getState().beer.beerList.beers
    const index = beers.findIndex((p) => p._id === data);
    
    const response = await headerAxios.put(`/api/beer/unlike/${data}`)

    const unLike_Data = {
      index: index,
      response: response.data
    }

    return unLike_Data;
  }
);

//한글, 영어 맥주명으로 검색하기
export const getSearchWord = createAsyncThunk(
  "beer/getSearchResult",
  async (data, thunkAPI) => {

    const response = await nonHeaderAxios.get(`/api/search?word=${data}`);
    
    return response.data;
  }
);

export const checkNickname = createAsyncThunk(
  "user/checkNickname",
  async (data, thunkAPI) => {
    const server_nickname ={
      nickname: data
    }
    const response = await nonHeaderAxios.post(`/api/user/nickname`, server_nickname);   
    return response.data;
  }
);


export const testResult = createAsyncThunk(
  "beer/testResult",
  async (data, thunkAPI) => {
    
    const response = await nonHeaderAxios.post(`/api/user/test`, data);
    
    return response.data;
  }
);

export const testShare = createAsyncThunk(
  "beer/testShare",
  async (data, thunkAPI) => {

    const response = await nonHeaderAxios.post(`/api/beercategory/result`, data);

    return response.data;
  }
);
