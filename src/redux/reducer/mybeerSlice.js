import { createSlice } from "@reduxjs/toolkit";
import { getMyDogam, getMyReview } from "../async/beer";

const initialState = {
    mydogam: [],
    beerOne: null,
    isLoading: false,
    isDone: false,
    isError: false,
};

const beerSlice = createSlice({
  name: "mybeer",
  initialState,
  extraReducers: (builder) =>
    builder
        .addCase(getMyDogam.pending, (state, action) => {
            state.beerList = [];
        })
        .addCase(getMyDogam.fulfilled, (state, action) => {
            state.beerList = action.payload;
        })
        .addCase(getMyDogam.rejected, (state, action) => {
            console.log("getMyDogam rejected: 나의 도감 불러오기에 실패했습니다");
        })
        .addCase(getMyReview.pending, (state, action) => {
            state.beerOne = null;
        })
        .addCase(getMyReview.fulfilled, (state, action) => {
            state.beerOne = action.payload;
        })
        .addCase(getMyReview.rejected, (state, action) => {
            console.log("getMyReview rejected: 나의 리뷰 불러오기에 실패했습니다");
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
export default beerSlice;
