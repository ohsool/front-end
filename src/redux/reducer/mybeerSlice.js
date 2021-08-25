import { createSelector, createSlice } from "@reduxjs/toolkit";
import { getMyDogam, getMyReview, unLikeBeerDogam, deleteReviewDogam } from "../async/mybeer";

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
        .addCase(getMyDogam.fulfilled, (state, action) => {
            state.mydogam = action.payload.likedList;
        })
        .addCase(getMyReview.fulfilled, (state, action) => {
            state.myReview = action.payload.mybeers;
        })
        .addCase(unLikeBeerDogam.fulfilled, (state, action) => {
          state.mydogam.splice(action.payload, 1);
        })
        .addCase(deleteReviewDogam.fulfilled, (state, action) => {
          state.myReview.splice(action.payload, 1);
          window.alert("삭제되었습니다.😊");
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
export default beerSlice;

const liked_list = (state) => state.mybeer.mydogam;

const myReview_list = (state) => state.mybeer.myReview;

export const likeList = createSelector(liked_list, liked_list => {
  return liked_list;
});

export const myReviewList = createSelector(myReview_list, myReview_list => {
  return myReview_list;
});