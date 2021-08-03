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
    
    console.log(response.data);
  return response.data;
  }
);

//유저 정보 불러오기
export const userInfo = createAsyncThunk(
  "user/userInfo",
  async (data, thunkAPI) => {

    const response = await headerAxios.get(`/api/user/me`);

    return response.data;
  }
)
