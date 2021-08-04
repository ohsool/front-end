import { createAsyncThunk } from "@reduxjs/toolkit";
import { headerAxios, nonHeaderAxios } from "./moduleAxios";

//해당 맥주 리뷰 가지고 오기
export const getReview = createAsyncThunk(
  "review/getReview",
  async (data, thunkAPI) => {
    const response = await nonHeaderAxios.get(`/api/mybeer/beer/${data}`);
    return response.data;
  }
);

//맥주 리뷰 작성
export const writeReview = createAsyncThunk(
  "review/writeReview",
  async (data, thunkAPI) => {
    const beerId = data.beerId;
    delete data.beerId;

    const response = await headerAxios.post(`/api/mybeer/${beerId}`, data); 
    return response.data;
  }
);

//수정
export const editReview = createAsyncThunk(
  "review/editReview",
  async (data, thunkAPI) => {
    console.log("before id delete:",data)
    const mybeerId = data.mybeerId;
    delete data.mybeerId;
    console.log("after id delete:",data)
  
    const response = await headerAxios.put(`/api/mybeer/${mybeerId}`, data);//fail?
    console.log("edit review response >",response);  
    return response.data;
  
  }
);


//삭제
export const deleteReview = createAsyncThunk(
  "review/deleteReview",
  async (data, thunkAPI) => {
    const response = await headerAxios.delete(`/api/mybeer/${data}`);
    console.log("delete review response >",response);   
    return response.data;
  }
);


