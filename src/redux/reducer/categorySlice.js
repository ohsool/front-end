import { createSlice, createSelector } from "@reduxjs/toolkit";
import { getCategory, getCategoryBeer } from "../async/category";

const initialState = {
    categoryList: [],
    categoryBeerList: [],
    isLoading: false,
    isDone: false,
    isError: false,
  };


const categorySlice = createSlice({
    name: "category",
    initialState,
    extraReducers: (builder) =>
      builder
          .addCase(getCategory.pending, (state, action) => {
            state.categoryList = [];
          })
          .addCase(getCategory.fulfilled, (state, action) => {
            const new_list = action.payload.beerCategories;
            new_list.unshift({ name: "All"});
            state.categoryList = new_list;
          })
          .addCase(getCategory.rejected, (state, action) => {
          })
          .addCase(getCategoryBeer.pending, (state, action) => {
            state.categoryBeerList = [];
          })
          .addCase(getCategoryBeer.fulfilled, (state, action) => {
            state.categoryBeerList = action.payload;
          })
          .addCase(getCategoryBeer.rejected, (state, action) => {
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
  
  export default categorySlice;
  
  const getCategoryList = (state) => state.category.categoryList; //맥주 카테고리 리스트

  const getCategoryBeerList = (state) => state.category.categoryBeerList; //카테고리별 맥주리스트
  
  export const categories = createSelector(getCategoryList, getCategoryList => {
    return getCategoryList;
  });

  export const categoryBeer = createSelector(getCategoryBeerList, getCategoryBeerList => {
    return getCategoryBeerList;
  });