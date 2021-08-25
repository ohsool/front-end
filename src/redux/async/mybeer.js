import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "./moduleAxios";

//좋아요한 도감 가지고 오기
export const getMyDogam = createAsyncThunk(
  "mybeer/getMyDogam",
  async (data, thunkAPI) => {

    const response = await axiosInstance.get(`/api/beer/liked`);

    return response.data;
  }
);

// review 목록 가지고오기
export const getMyReview = createAsyncThunk(
    "mybeer/getMyReview", 
    async (data, thunkAPI) => {

    const response = await axiosInstance.get(`/api/mybeer/my`);
    
  return response.data;
});

//맥주도감에서 맥주 좋아요 취소
export  const unLikeBeerDogam = createAsyncThunk(
  "beer/unLikeBeerDogam",
  async (data, thunkAPI) => {
    const beers = thunkAPI.getState().mybeer.mydogam;
    const index = beers.findIndex((p) => p._id === data);

    return index;
  }
);

//맥주도감에서 리뷰 삭제
export const deleteReviewDogam = createAsyncThunk(
  "review/deleteReviewDogam",
  async (data, thunkAPI) => {
    const reviews = thunkAPI.getState().mybeer.mydogam;
    const index = reviews.findIndex((p) => p._id === data);

    return index;
  }
);
