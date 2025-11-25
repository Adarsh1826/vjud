import { configureStore } from "@reduxjs/toolkit";
import outputReducer from "./slice";


export const store = configureStore({
  reducer: {
    output: outputReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
