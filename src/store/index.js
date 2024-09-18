import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import settingsReducer from "./settings";

const logger = createLogger({
  level: 'info',
  collapsed: true
});

const store = configureStore({
  reducer: {
    settings: settingsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
