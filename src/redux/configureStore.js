import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

import {
    userSlice, 
    suggestSlice, 
    beerSlice, 
    categorySlice} from "./reducer/SliceIndex";

export const history = createBrowserHistory();

const reducer = combineReducers({
  category: categorySlice.reducer,
  beer: beerSlice.reducer,
  suggest: suggestSlice.reducer,
  user: userSlice.reducer,
  router: connectRouter(history),
});

const middlewares = [];

const env = process.env.NODE_ENV;

// if (env === "development") {
//     const { logger } = require("redux-logger");
//     middlewares.push(logger);
//   }

export const store = configureStore({
  reducer,
  middleware: [...middlewares, ...getDefaultMiddleware()],
  devTools: env !== "production",
});
