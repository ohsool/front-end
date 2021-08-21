import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "./moduleAxios";

//모든 맥주 정보 가지고 오기
export const getAllBeer = createAsyncThunk(
  "beer/getAllBeer",
  async (data, thunkAPI) => {
    
    const response = await axiosInstance.get(`/api/beer/list/${data}`);
    
    return response.data;
  }
);

//특정 맥주 정보 가지고 오기
export const getOneBeer = createAsyncThunk(
    "beer/getOneBeer",
    async (data, thunkAPI) => {

    const response = await axiosInstance.get(`/api/beer/list/${data}`);
    
    return response.data;
    }
);

export const getBeerInfinity = createAsyncThunk(
  "beer/getBeerInfinity",
  async (data, thunkAPI) => {

    const response = await axiosInstance.get(`/api/beer/list/all/page?pageNo=${data}&sort=createDate`);
    
    return response.data;
  }
);
//카테고리별 맥주 가져오기
export const getBeerCategoryList = createAsyncThunk(
  "beer/getBeerCategoryList",
  async (data, thunkAPI) => {

    const response = await axiosInstance.get(`/api/beer/list/category/${data}`);
    
    return response.data
  }
);

//특정 맥주 좋아요 적용
export  const likeBeer = createAsyncThunk(
  "beer/likeBeer",
  async (data, thunkAPI) => {
    const beersIf = thunkAPI.getState().beer.testBeerList;
    const indexIf = beersIf.findIndex((p) => p._id === data);

    const response = await axiosInstance.put(`/api/beer/like/${data}`)
    const like_Data = {
      indexIf: indexIf,
      response: response.data
    }
    return like_Data;
  }
);

//특정 맥주 좋아요 취소
export  const unLikeBeer = createAsyncThunk(
  "beer/unLikeBeer",
  async (data, thunkAPI) => {
    const beersIf = thunkAPI.getState().beer.testBeerList;
    const indexIf = beersIf.findIndex((p) => p._id === data);
    
    const response = await axiosInstance.put(`/api/beer/unlike/${data}`)

    const unLike_Data = {
      indexIf: indexIf,
      response: response.data
    }
    return unLike_Data;
  }
);

//한글, 영어 맥주명으로 검색하기
export const getSearchWord = createAsyncThunk(
  "beer/getSearchResult",
  async (data, thunkAPI) => {

    const response = await axiosInstance.get(`/api/search?word=${data}`);
    
    return response.data;
  }
);

export const getHashtagWord = createAsyncThunk(
  "beer/getHashtagResult",
  async (data, thunkAPI) => {

    const response = await axiosInstance.get(`/api/search/hashtag?hashtag=${data}`);
    
    return response.data;
  }
);


export const checkNickname = createAsyncThunk(
  "user/checkNickname",
  async (data, thunkAPI) => {
    const server_nickname ={
      nickname: data
    }
    const response = await axiosInstance.post(`/api/user/nickname`, server_nickname);

    return response.data;
  }
);


export const testResult = createAsyncThunk(
  "beer/testResult",
  async (data, thunkAPI) => {
    
    const response = await axiosInstance.post(`/api/user/test`, data);
    
    return response.data;
  }
);

export const testShare = createAsyncThunk(
  "beer/testShare",
  async (data, thunkAPI) => {

    const response = await axiosInstance.post(`/api/beercategory/result`, data);

    return response.data;
  }
);


