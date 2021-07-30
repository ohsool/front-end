import { createSlice } from "@reduxjs/toolkit";
import { getCategory } from "../async/category";

const initialState = {
    categoryList: null,
    isLoading: false,
    isDone: false,
    isError: false,
  };
/*

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
      logOut: (state, action) => {
        sessionStorage.removeItem("token");
        state.currentUser = null;
      },
    },
    extraReducers: (builder) =>
      builder
          .addCase(signUp.fulfilled, (state, action) => {
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
  */