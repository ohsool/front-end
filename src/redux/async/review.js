import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "./moduleAxios";

//해당 맥주 리뷰 가지고 오기
export const getReview = createAsyncThunk(
  "review/getReview",
  async (data, thunkAPI) => {

    const response = await axiosInstance.get(`/api/mybeer/beer/${data}`);
    
    return response.data;
  }
);

//맥주 리뷰 작성
export const writeReview = createAsyncThunk(
  "review/writeReview",
  async (data, thunkAPI) => {
    const beerId = data.beerId;
    delete data.beerId;

    const response = await axiosInstance.post(`/api/mybeer/${beerId}`, data);
    
      return response.data;
    }
);

//맥주 리뷰 수정
export const editReview = createAsyncThunk(
  "review/editReview",
  async (data, thunkAPI) => {
    const mybeerId = data.mybeerId;
    delete data.mybeerId;

    const response = await axiosInstance.put(`/api/mybeer/${mybeerId}`, data);
    //return response.data;

    const review= thunkAPI.getState().review.reviewList.myBeers;
    const index = review.findIndex((p)=> p.id === data.mybeerId);

    const review_data={
      index: index,
      response: response.data
    }
    
    return review_data;
  }
);


//맥주 리뷰 삭제
export const deleteReview = createAsyncThunk(
  "review/deleteReview",
  async (data, thunkAPI) => {
    const review = thunkAPI.getState().review.reviewList;
    const index = review.findIndex((p) => p._id === data);
    const response = await axiosInstance.delete(`/api/mybeer/${data}`);
    if(response.data.message === "success"){
    return index;
    }
  }
);


