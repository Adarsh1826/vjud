import { configureStore } from "@reduxjs/toolkit";
import {outputReducer} from "./slice";
import { inputReducer ,expectedOutputReducer} from "./slice";

export const store = configureStore({
  reducer: {
    output: outputReducer,
    input:inputReducer,
    expectedOutput:expectedOutputReducer
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
