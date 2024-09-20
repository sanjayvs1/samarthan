import { configureStore } from "@reduxjs/toolkit";
import detailReducer from "./detailsSlice";
const appStore = configureStore({
  reducer: {
    details: detailReducer,
  },
});

export default appStore;
