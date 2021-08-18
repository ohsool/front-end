import { createSlice, createSelector } from "@reduxjs/toolkit";

import { 
  getAllBeer, 
  getOneBeer,
  getBeerInfinity,
  getSearchWord,
  testShare, 
  testResult,
  getHashtagWord,
  likeBeer,
  unLikeBeer,
} from "../async/beer";

const initialState = {
    beerList: [],
    testBeerList: [],
    beerOne: null,
    beerToday: [],
    beerShare: [],
    searchList: [],
    hashtagList: [],
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
        .addCase(getBeerInfinity.fulfilled, (state, action) => {
          // state.testBeerList.push(...action.payload.beers);
          state.testBeerList = [...state.testBeerList, ...action.payload.beers];
        })
        //검색기능
        .addCase(getSearchWord.fulfilled, (state, action) => {
            state.searchList = action.payload.words;
        })
        .addCase(getSearchWord.rejected, (state, action) => {
        })
        //해시태그 검색 기능
        .addCase(getHashtagWord.fulfilled, (state, action) => {
          state.hashtagList = action.payload.beers;
        })
        .addCase(getHashtagWord.rejected, (state, action) => {
        })
        .addCase(likeBeer.fulfilled, (state, action) => {
          const index = action.payload.index;
          const indexIf = action.payload.indexIf;
          const likes_array = action.payload.response.likes;
          state.testBeerList[indexIf].like_array = likes_array;
          state.beerList.beers[index].like_array = likes_array;
        })
        .addCase(likeBeer.rejected, (state, action) => {
        })
        .addCase(unLikeBeer.fulfilled, (state, action) => {
          const index = action.payload.index;
          const indexIf = action.payload.indexIf;
          const likes_array = action.payload.response.likes;
          state.testBeerList[indexIf].like_array = likes_array;
          state.beerList.beers[index].like_array = likes_array;
        })
        .addCase(testShare.fulfilled, (state, action) => {
          state.beerToday = action.payload;
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

const beerHashtag = (state) => state.beer.hashtagList;

const beer_Today = (state) => state.beer.beerToday.category;

const beer_recommend = (state) => state.beer.beerToday.recommendations;

const beer_Infinity = (state) => state.beer.testBeerList;

export const getBeerList = createSelector([beer_list], beerList => {
  return beerList;
}); //전체 맥주리스트

export const oneBeer = createSelector(beer_One, beer_One => {
  return beer_One;
}); // 맥주 1개데이터 

export const getSearchList = createSelector(beerSearch, beerSearch => {
  return beerSearch.slice(0,5);
}); //맥주 검색

export const getHashtagList = createSelector(beerHashtag, beerHashtag => {
  return beerHashtag;
}); //해시태그로 맥주 검색

export const recommendCate = createSelector(beer_Today, beer_Today => {
  return beer_Today;
});

export const recommendBeerToday = createSelector(beer_recommend, beer_recommend => {
  return beer_recommend;
});

export const InfinityBeer = createSelector(beer_Infinity, beer_Infinity => {
  return beer_Infinity;
});