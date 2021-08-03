import { createAsyncThunk } from "@reduxjs/toolkit";
import { headerAxios, nonHeaderAxios } from "./moduleAxios";

//해당 맥주 리뷰 가지고 오기
export const getReview = createAsyncThunk(
  "review/getReview",
  async (data, thunkAPI) => {
    console.log("data==>",data);
    const response = await nonHeaderAxios.get(`/api/mybeer/beer`, data); //data : {"beer": "하이네켄"}
    return response.data;
  }
);

//맥주 리뷰 작성
export const writeReview = createAsyncThunk(
  "review/writeReview",
  async (data, thunkAPI) => {
    const response = await headerAxios.post(`/api/mybeer`, data); 
    return response.data;
  }
);

//수정
export const editReview = createAsyncThunk(
  "review/editReview",
  async (data,  thunkAPI) => {
    const response = await headerAxios.put(`/api/mybeer/${data}`);    
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


