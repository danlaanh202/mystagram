import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import userReducer from "./userRedux";
import loadingReducer from "./loadingRedux";
import rtcReducer from "./rtcRedux";
import headerReducer from "./headerStatusRedux";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  // blacklist: ["rtc"],
};

const rootReducer = combineReducers({
  user: userReducer,
  loading: loadingReducer,
  rtc: rtcReducer,
  header: headerReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export let persistor = persistStore(store);
