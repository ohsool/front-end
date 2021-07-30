import { createAsyncThunk } from "@reduxjs/toolkit";
import { headerAxios, nonHeaderAxios } from "./moduleAxios";

// 회원 가입
export const signUp = createAsyncThunk(
  "user/signUp",
  async (data, thunkAPI) => {

    const response = await nonHeaderAxios.post(`/api/user`, data);

    return response.data;
  }
);

// 로그인
export const logIn = createAsyncThunk("user/logIn", 
async (data, thunkAPI) => {

    const response = await nonHeaderAxios.post(`api/user/auth`, data);
    
  return response.data;
});
