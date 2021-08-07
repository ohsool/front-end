import { createSlice } from "@reduxjs/toolkit";
import { 
  signUp, 
  logIn, 
  userInfo, 
  checkEmail,
  checkNickname,
} from "../async/user";
import {history} from "../configureStore"

const initialState = {
  userList: null,
  currentUser: [],
  checkEmail: null,
  checkNickname: null,
  isLoading: false,
  isDone: false,
  isError: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: (state, action) => {
      sessionStorage.removeItem("token");
      window.location.replace("/");
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(signUp.fulfilled, (state, action) => {
        if(action.payload.message === "success"){
          window.location.href = "/"
        }
        if(action.payload.message === "existed user"){
          window.alert("이미 존재하는 아이디입니다!")
        }
        //window.location.reload("/");
      })
      .addCase(checkEmail.fulfilled, (state, action) => {
        state.checkEmail = action.payload.existed;
      })
      .addCase(checkEmail.rejected, (state, action) => {
      })
      .addCase(checkNickname.fulfilled, (state, action) => {
        state.checkNickname = action.payload.existed;
      })
      .addCase(checkNickname.rejected, (state, action) => {
      })
      .addCase(logIn.pending, (state, action) => {
      })
      .addCase(logIn.fulfilled, (state, action) => {
        sessionStorage.setItem("token", action.payload.token);
        window.location.replace("/");
      })
      .addCase(logIn.rejected, (state, action) => {
        window.alert("아이디나 비밀번호가 틀립니다!")
      })
      .addCase(userInfo.pending, (state, action) => {
        state.currentUser = [];
      })
      .addCase(userInfo.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(userInfo.rejected, (state, action) => {
      })
      // 공통
      .addMatcher(
        (action) => {
          return action.type.includes("/pending");
        },
        (state, action) => {
          state.isLoading = true;
          state.isDone = false;
          state.isError = null;
        }
      )
      .addMatcher(
        (action) => {
          return action.type.includes("/fulfilled");
        },
        (state, action) => {
          state.isLoading = false;
          state.isDone = true;
        }
      )
      .addMatcher(
        (action) => {
          return action.type.includes("/rejected");
        },
        (state, action) => {
          state.isLoading = false;
          state.isError = action.error;
        }
      ),
});

export const { logOut } = userSlice.actions;

export default userSlice;
