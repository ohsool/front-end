import { createSlice } from "@reduxjs/toolkit";
import { suggestComment, suggestBeer } from "../async/suggest";

const initialState = {
    suggestComment: null,
    suggestBeer: null,
    isLoading: false,
    isDone: false,
    isError: false,
};

const userSlice = createSlice({
  name: "suggest",
  initialState,
  extraReducers: (builder) =>
    builder
        .addCase(suggestComment.pending, (state, action) => {
        })
        .addCase(suggestComment.fulfilled, (state, action) => {
        })
        .addCase(suggestBeer.pending, (state, action) => {
        })
        .addCase(suggestBeer.fulfilled, (state, action) => {
            console.log(action.payload);
            window.alert("건의가 완료되었습니다")
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
