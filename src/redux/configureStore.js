import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

import userSlice from "./reducer/userSlice";
import suggestSlice from "./reducer/suggestSlice";
import beerSlice from "./reducer/beerSlice";
import categorySlice from "./reducer/categorySlice";

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

if (env === "development") {
    const { logger } = require("redux-logger");
    middlewares.push(logger);
  }

export const store = configureStore({
  reducer,
  middleware: [...middlewares, ...getDefaultMiddleware()],
  devTools: env !== "production",
});
