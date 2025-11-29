import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MultipleTestCaseProps } from "@/types";
// this is for single testcase
const outputSlice = createSlice({
    name: 'output',
    initialState: "",
    reducers: {
        setOutputValue: (state, action: PayloadAction<string>) => {
            return action.payload
        }
    }
})
export const inputSlice = createSlice({
    name: "input",
    initialState: "",
    reducers: {
        setInputValue: (state, action: PayloadAction<string>) => {
            return action.payload
        }
    }
})

export const expectedOutputSlice = createSlice({
    name: "expectedOutput",
    initialState: "",
    reducers: {
        setExpectedOutput: (state, action: PayloadAction<string>) => {
            return action.payload
        }
    }
})


export const testcaseSlice = createSlice({
    name: 'testcase',
    initialState: null as boolean | null,
    reducers: {
        setPassed: (state, action: PayloadAction<boolean>) => {
            return action.payload
        }
    }
})

// for multiple testcase


export const multipleTestCaseSlice = createSlice({
    name: 'multtest',
    initialState: [] as MultipleTestCaseProps[],
    reducers: {
        addTestCase: (state, action: PayloadAction<MultipleTestCaseProps>) => {
            state.push(action.payload);
        },
        removeTestCase: (state, action: PayloadAction<number>) => {
            return state.filter(item => item.id !== action.payload);
        },
        updateTestCase: (state, action: PayloadAction<{ id: number; field: string; value: any }>) => {
            const idx = state.findIndex((tc) => tc.id === action.payload.id);
            if (idx !== -1) {
                (state[idx] as any)[action.payload.field] = action.payload.value;
            }
        },

    }
});

export const { addTestCase, removeTestCase, updateTestCase } = multipleTestCaseSlice.actions;



export const { setOutputValue } = outputSlice.actions;
export const { setInputValue } = inputSlice.actions
export const { setExpectedOutput } = expectedOutputSlice.actions
export const { setPassed } = testcaseSlice.actions



// reducers
export const outputReducer = outputSlice.reducer;
export const inputReducer = inputSlice.reducer;
export const expectedOutputReducer = expectedOutputSlice.reducer
export const testCaseReducer = testcaseSlice.reducer

export const multTestCaseReducer = multipleTestCaseSlice.reducer