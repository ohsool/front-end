import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "./moduleAxios";

//좋아요한 도감 가지고 오기
export const getMyDogam = createAsyncThunk(
  "mybeer/getMyDogam",
  async (data, thunkAPI) => {
    const response = await axiosInstance.get(`/api/beer/liked`);
    return response.data;
  }
);

// review 목록 가지고오기
export const getMyReview = createAsyncThunk(
    "mybeer/getMyReview", 
    async (data, thunkAPI) => {

    const response = await axiosInstance.get(`/api/mybeer/my`);
    
  return response.data;
});

//맥주도감에서 맥주 좋아요 취소
export  const unLikeBeerDogam = createAsyncThunk(
  "mybeer/unLikeBeerDogam",
  async (data, thunkAPI) => {
    const beers = thunkAPI.getState().mybeer.mydogam;
    const index = beers.findIndex((p) => p._id === data);

    return index;
  }
);
//맥주도감에서 리뷰 수정
export const editReviewDogam = createAsyncThunk(
  "mybeer/editReviewDogam",
  async (data, thunkAPI) => {
    const review = thunkAPI.getState().mybeer.myReview;
    const index  = review.findIndex((p) => p._id === data.mybeerId);
    // myFeatures, location, rate, review
    const response = await axiosInstance.put(`/api/mybeer/${data.mybeerId}`, data);

    const dataSlice = {
      myFeatures: data.myFeatures,
      rate: data.rate,
      review: data.review,
      index: index
    }
    return dataSlice;
  }
);


export const deleteReviewDogam = createAsyncThunk(
  "mybeer/deleteReviewDogam",
  async (data, thunkAPI) => {
    const review = thunkAPI.getState().mybeer.myReview;
    const index = review.findIndex((p) => p._id === data);
    const response = await axiosInstance.delete(`/api/mybeer/${data}`);
    if(response.data.message === "success"){
    return index;
    }
  }
);

//타 유저의 맥주도감 리스트 출력
export const getOtherUserDogam = createAsyncThunk(
  "mybeer/getOtherUserDogam",
  async (data, thunkAPI) => {

    const response = await axiosInstance.get(`/api/mybeer/others/${data}?sort="rate"&pageNo=0&type=beer`);
    
    return response.data;
  }
)

//타유저가 좋아요한 맥주리스트 출력
export const getOtherUserLikes = createAsyncThunk(
  "mybeer/getOtherUserLikes",
  async (data, thunkAPI) => {
    
    const response = await axiosInstance.get(`/api/mybeer/others/${data}?sort="rate"&pageNo=0&type=liked`);

    return response.data;
  }
)

export const changeMyDescription = createAsyncThunk(
  "mybeer/changeMyDescription",
  async (data, thunkAPI) => {
    const sendData = {
      description: data
    }
    const response = await axiosInstance.put(`/api/user/description`, sendData);
    
    return response.data;

  }
)

export const followUser = createAsyncThunk(
  "user/followUser",
  async (data, thunkAPI) => {
    const followId = {
      userId: data.otheruserId
    }
    const response = await axiosInstance.put(`/api/user/follow/follow`, followId);
    console.log(data.userId);
    return data.userId;
  }
)

export const unFollowUser = createAsyncThunk(
  "user/unFollowUser",
  async (data, thunkAPI) => {
    const unFollowId = {
      userId: data.otheruserId
    }
    const followers = thunkAPI.getState().mybeer.followers;
    const index = followers.findIndex((p) => p === data.userId);
    const response = await axiosInstance.put(`/api/user/follow/unfollow`, unFollowId);
    console.log(index);
    return data.userId;
  }
)

export const checkFollowUser = createAsyncThunk(
  "user/checkFollowUser",
  async (data, thunkAPI) => {

    const response = await axiosInstance.get(`/api/user/follow/followers/${data}`);

    return response.data;
  }
)