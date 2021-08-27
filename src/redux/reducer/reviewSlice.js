import { createSlice, createSelector } from "@reduxjs/toolkit";
import { getReview, writeReview, editReview, deleteReview } from "../async/review";


const initialState = {
    reviewList: [],
    isLoading: false,
    isDone: false,
    isError: false,
};

const initialReview = {
  beer: "",//beername
  myFeatures: {
                "bitter": 0, 
                "crispy": 0, 
                "flavor": 0, 
                "sweet": 0, 
                "nutty": 0
  },
  location: "default",
  rate: 0,
  review: ""
};


const reviewSlice = createSlice({
  name: "review",
  initialState,
  extraReducers: (builder) =>
    builder
        .addCase(getReview.fulfilled, (state, action) => {
            state.reviewList = action.payload.mybeers.reverse();
        })
        .addCase(writeReview.fulfilled, (state, action) => {
          state.reviewList.unshift(action.payload.mybeer)
        })
        .addCase(editReview.fulfilled, (state, action) => {
          state.reviewList[action.payload.index].myFeatures = action.payload.myFeatures;
          state.reviewList[action.payload.index].rate = action.payload.rate;
          state.reviewList[action.payload.index].review = action.payload.review;

        })
        .addCase(deleteReview.fulfilled, (state, action) => {
          state.reviewList.splice(action.payload, 1);
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

export default reviewSlice;

const review_list = (state) => state.review.reviewList;

export const getReviewList = createSelector(review_list, review_list => {

  return review_list;

}); //전체 맥주리스트