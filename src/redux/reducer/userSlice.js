import { createSlice } from "@reduxjs/toolkit";
import { signUp, logIn } from "../async/user";

const initialState = {
  userList: null,
  currentUser: null,
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
          if(action.payload.message === "existed user"){
            window.alert("이미 존재하는 아이디입니다!")
            return;
          }
          window.location.reload("/");
        })
        .addCase(logIn.pending, (state, action) => {
        })
        .addCase(logIn.fulfilled, (state, action) => {
          sessionStorage.setItem("token", action.payload.token);
          window.location.reload("/");
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
