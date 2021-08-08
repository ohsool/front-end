import { createSelector, createSlice } from "@reduxjs/toolkit";
import { getMyDogam, getMyReview } from "../async/mybeer";

const initialState = {
    mydogam: [],
    myReview: [],
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
            state.mydogam = [];
        })
        .addCase(getMyDogam.fulfilled, (state, action) => {
            state.mydogam = action.payload.likedList;
        })
        .addCase(getMyDogam.rejected, (state, action) => {
        })
        .addCase(getMyReview.pending, (state, action) => {
            state.myReview = null;
        })
        .addCase(getMyReview.fulfilled, (state, action) => {
            state.myReview = action.payload.mybeers;
        })
        .addCase(getMyReview.rejected, (state, action) => {
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

const liked_list = (state) => state.mybeer.mydogam;

const myReview_list = (state) => state.mybeer.myReview;

export const likeList = createSelector(liked_list, liked_list => {
  return liked_list;
});

export const myReviewList = createSelector(myReview_list, myReview_list => {
  return myReview_list;
});