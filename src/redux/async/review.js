import { createAsyncThunk } from "@reduxjs/toolkit";
import { headerAxios, nonHeaderAxios } from "./moduleAxios";

//전체 맥주 리뷰 가지고 오기
export const getReview = createAsyncThunk(
  "review/getReview",
  async (data, thunkAPI) => {

    const response = await nonHeaderAxios.get(`/api/mybeer/all`);

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


//삭제


