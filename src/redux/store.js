import {combineReducers, configureStore} from "@reduxjs/toolkit";
import PostReducer from "./features/postSlice";
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";

//persisting the user's in redux
const persistConfig = {
  key: "root",
  version: "1",
  storage,
};
const reducer = combineReducers({
  app: PostReducer,
});
const persistedReducer = persistReducer(persistConfig, reducer);
export default configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
