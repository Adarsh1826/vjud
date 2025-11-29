import { configureStore } from "@reduxjs/toolkit";
import {outputReducer} from "./slice";
import { inputReducer ,expectedOutputReducer,testCaseReducer , multTestCaseReducer} from "./slice";

export const store = configureStore({
  reducer: {
    output: outputReducer,
    input:inputReducer,
    expectedOutput:expectedOutputReducer,
    testcase:testCaseReducer,
    multtest:multTestCaseReducer
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
