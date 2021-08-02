import { createSlice } from "@reduxjs/toolkit";
import { writeReview} from "../async/review";
const initialState = {
    writeReview: null,
    isLoading: false,
    isDone: false,
    isError: false,
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  extraReducers: (builder) =>
    builder
        .addCase(writeReview.pending, (state, action) => {
        })
        .addCase(writeReview.fulfilled, (state, action) => {
        })
        .addCase(writeReview.pending, (state, action) => {
        })
        .addCase(writeReview.fulfilled, (state, action) => {
            console.log(action.payload);
            window.alert("리뷰 작성이 완료되었습니다")
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
