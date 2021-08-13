import { createSlice, createSelector } from "@reduxjs/toolkit";

import { 
  getAllBeer, 
  getOneBeer, 
  getSearchWord, 
  testShare, 
  testResult,
  likeBeer,
  unLikeBeer,
} from "../async/beer";

const initialState = {
    beerList: [],
    beerOne: null,
    beerToday: [],
    beerShare: [],
    searchList: [],
    isLoading: false,
    isDone: false,
    isError: false,
};

export const beerSlice = createSlice({
  name: "beer",
  initialState,
  extraReducers: (builder) =>
    builder
        .addCase(getAllBeer.fulfilled, (state, action) => {
            state.beerList = action.payload;
        })
        .addCase(getOneBeer.fulfilled, (state, action) => {
            state.beerOne = action.payload.beer;
        })
        //검색기능
        .addCase(getSearchWord.fulfilled, (state, action) => {
            state.searchList = action.payload.words;
        })
        .addCase(getSearchWord.rejected, (state, action) => {
        })
        .addCase(likeBeer.fulfilled, (state, action) => {
          const index = action.payload.index;
          const likes_array = action.payload.response.likes;
          state.beerList.beers[index].like_array = likes_array;
        })
        .addCase(likeBeer.rejected, (state, action) => {
        })
        .addCase(unLikeBeer.fulfilled, (state, action) => {
          const index = action.payload.index;
          const likes_array = action.payload.response.likes;
          state.beerList.beers[index].like_array = likes_array;
        })
        .addCase(unLikeBeer.rejected, (state, action) => {
        })
        .addCase(testShare.fulfilled, (state, action) => {
          state.beerToday = action.payload;
        })
        .addCase(testShare.rejected, (state, action) => {
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

const beer_list = (state) => state.beer.beerList.beers;

const beer_One = (state) => state.beer.beerOne;

const beerSearch = (state) => state.beer.searchList;

const beer_Today = (state) => state.beer.beerToday.category;

const beer_recommend = (state) => state.beer.beerToday.recommendations;

export const getBeerList = createSelector([beer_list], beerList => {
  return beerList;
}); //전체 맥주리스트

export const oneBeer = createSelector(beer_One, beer_One => {
  return beer_One;
}); // 맥주 1개데이터 

export const getSearchList = createSelector(beerSearch, beerSearch => {
  console.log("beer", beerSearch);
  return beerSearch.slice(0,5);
}); //맥주 검색

export const recommendCate = createSelector(beer_Today, beer_Today => {
  return beer_Today;
});

export const recommendBeerToday = createSelector(beer_recommend, beer_recommend => {
  return beer_recommend;
});