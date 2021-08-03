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

export const checkEmail = createAsyncThunk(
  "user/checkEmail",
  async (data, thunkAPI) => {
    const server_email = {
      email: data,
    }
    const response = await nonHeaderAxios.get(`/api/user/email`, server_email);
    
    return response.data;
  }
)

export const checkNickname = createAsyncThunk(
  "user/checkNickname",
  async (data, thunkAPI) => {
    const server_nickname ={
      nickname: data
    }
    const response = await nonHeaderAxios.get(`/api/user/nickname`, server_nickname);

    return response.data;
  }
)

//카카오 로그인
export const kakaoLogin = createAsyncThunk(
  "user/kakaoLogin",
  async (data, thunkAPI) => {
    
    const response = await nonHeaderAxios.post(`/api/user/kakao`);

    return response.data;
  }
)

//구글 로그인
export const googleLogin = createAsyncThunk(
  "user/googleLogin",
  async (data, thunkAPI) => {
    
    const response = await nonHeaderAxios.post(`/api/user/google`);

    return response.data;
  }
)
