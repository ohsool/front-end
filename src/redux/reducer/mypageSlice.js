import { createSelector, createSlice } from "@reduxjs/toolkit";

import { getReviewLength } from "../async/mypage";


const initialState = {
    mydogam: [],
    myReview: [],
    length: 0,
    isLoading: false,
    isDone: false,
    isError: false,
};

const mypageSlice = createSlice({
  name: "mypage",
  initialState,
  extraReducers: (builder) =>
    builder
        .addCase(getReviewLength.fullfilled, (state,action)=>{
            //state.length = action.payload;
            console.log("action.payload.length",action.payload);
        })
      // 공통
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
//export default beerSlice;


