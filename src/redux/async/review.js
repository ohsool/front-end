import { createAsyncThunk } from "@reduxjs/toolkit";
import { headerAxios, nonHeaderAxios } from "./moduleAxios";

//해당 맥주 리뷰 가지고 오기
export const getReview = createAsyncThunk(
  "review/getReview",
  async (data, thunkAPI) => {
    console.log("beer_reviews >",data);
    const response = await nonHeaderAxios.get(`/api/mybeer/beer`, data);
    
    console.log("get review response:", response)
    return response.data;
  }
);

//맥주 리뷰 작성
export const writeReview = createAsyncThunk(
  "review/writeReview",
  async (data, thunkAPI) => {
    const response = await headerAxios.post(`/api/mybeer`, data);//post(`/api/mybeer/${beerId}`, data); 
    console.log("submit review data >", data);
    console.log("submit review response >",response);//success
    return response.data;
  }
);

//수정
export const editReview = createAsyncThunk(
  "review/editReview",
  async (data, thunkAPI) => {
    const response = await headerAxios.put(`/api/mybeer/${mybeerId}`, data);
    console.log("edit review response >",response);  
    return response.data;
  }
);


//삭제
export const deleteReview = createAsyncThunk(
  "review/deleteReview",
  async (data, mybeerId, thunkAPI) => {
    const response = await headerAxios.delete(`/api/mybeer/${data}`);    
    return response.data;
  }
);


