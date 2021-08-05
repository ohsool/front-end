import { createSlice } from "@reduxjs/toolkit";
import { getReview, writeReview} from "../async/review";

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
        .addCase(getReview.pending, (state, action) => {
            state.reviewList = [];
        })
        .addCase(getReview.fulfilled, (state, action) => {
            state.reviewList = action.payload.myBeers;
        })
        .addCase(getReview.rejected, (state, action) => {
            console.log("reviewList rejected: 리뷰목록 불러오기에 실패했습니다");
        })
        .addCase(writeReview.pending, (state, action) => {
        })
        .addCase(writeReview.fulfilled, (state, action) => {
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

export default reviewSlice;
