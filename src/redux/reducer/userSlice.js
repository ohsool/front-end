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
      sessionStorage.removeItem("access_token");
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
