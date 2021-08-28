import { createSelector, createSlice } from "@reduxjs/toolkit";
import { 
  getMyDogam, 
  getMyReview, 
  unLikeBeerDogam, 
  deleteReviewDogam, 
  editReviewDogam,
  checkFollowUser,
  followUser,
  unFollowUser,
  getOtherUserDogam,
  getOtherUserLikes,
  OtherUserInfo
} from "../async/mybeer";

const initialState = {
    mydogam: [],
    myReview: [],
    length: 0,
    otherDogam: [],
    otherLikes: [],
    others: [],
    followers: [],
    following: [],
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
        .addCase(getOtherUserDogam.fulfilled, (state, action) => {
          state.otherDogam = action.payload.mybeers
        })
        .addCase(OtherUserInfo.fulfilled, (state, action) => {
          state.others = action.payload.user;
        })
        .addCase(getOtherUserLikes.fulfilled, (state, action) => {
          state.otherLikes = action.payload.mybeers;
        })
        .addCase(checkFollowUser.fulfilled, (state, action) => {
          state.followers = action.payload.follower_list;
          state.following = action.payload.follow_list;
        })
        .addCase(followUser.fulfilled, (state, action) => {
          state.followers = [...state.followers, action.payload];
        })
        .addCase(unFollowUser.fulfilled, (state, action) => {
          state.followers.splice(action.payload, 1);
        })
        .addCase(unLikeBeerDogam.fulfilled, (state, action) => {
          state.mydogam.splice(action.payload, 1);
        })
        .addCase(editReviewDogam.fulfilled, (state, action) => {
          state.myReview[action.payload.index].myFeatures = action.payload.myFeatures;
          state.myReview[action.payload.index].rate = action.payload.rate;
          state.myReview[action.payload.index].review = action.payload.review;
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

const others_info = (state) => state.mybeer.others;

export const otherStatus = createSelector(others_info, others_info => {
  return others_info;
})

export const length = (state) => state.mybeer.length;

export const likeList = createSelector(liked_list, liked_list => {
  return liked_list;
});

export const count = createSelector(length, length => {
  return length;
});

export const myReviewList = createSelector(myReview_list, myReview_list => {
  return myReview_list;
});