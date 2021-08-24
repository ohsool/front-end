import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "./moduleAxios";
import { removeCookie } from "../../share/Cookie";
import { history } from "../configureStore";

// 회원 가입
export const signUp = createAsyncThunk(
  "user/signUp",
  async (data, thunkAPI) => {

    const response = await axiosInstance.post(`/api/user`, data);
    
    return response.data;
  }
);

// 로그인
export const logIn = createAsyncThunk(
  "user/logIn",
  async (data, thunkAPI) => {

    const response = await axiosInstance.post(`api/user/auth`, data);
    
    return response.data;
  }
);

export const logOut = createAsyncThunk(
  "user/logOut",
  async (data, thunkAPI) => {
    
    const response = await axiosInstance.post(`/api/user/logout`);
    if(response.data.message === "success"){
      alert("로그아웃되었습니다.")
      return response.data;
    }
  }
)

export const withDrawl = createAsyncThunk(
  "user/withDrawl",
  async (data, thunkAPI) => {

    const response = await axiosInstance.delete(`/api/user`);
    if(response.data.message === "success"){
      alert("회원탈퇴가 완료되었습니다.")
      return response.data;
    }
  }
)

//유저 정보 불러오기
export const userInfo = createAsyncThunk(
  "user/userInfo",
  async (data, thunkAPI) => {
    const response = await axiosInstance.get(`/api/user/me`);
    if(response.data.message === "fail" && response.data.error === "all tokens are expired"){
      removeCookie("osid");
      removeCookie("_osidRe");
      alert("로그인기간이 만료되었습니다. 다시 로그인하시겠어요?")
      window.location.href = "/"
    }
    return response.data;
  }
);

export const checkEmail = createAsyncThunk(
  "user/checkEmail",
  async (data, thunkAPI) => {
    const server_email = {
      email: data
    }
    const response = await axiosInstance.post(`/api/user/email`, server_email);
    
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

export const socialLoginUser = createAsyncThunk(
  "user/socialLoginUser",
  async (data, thunkAPI) => {
    const response = await axiosInstance.post(`/api/user/socialuser`, data);

    return response.data;
  }
)
