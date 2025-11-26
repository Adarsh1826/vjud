import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import React from "react";

const outputSlice = createSlice({
    name:'output',
    initialState:"",
    reducers:{
        setOutputValue:(state,action:PayloadAction<string>)=>{
            return action.payload          
        }
    }
})
export const inputSlice = createSlice({
    name:"input",
    initialState:"",
    reducers:{
        setInputValue:(state,action:PayloadAction<string>)=>{
            return action.payload
        }
    }
})

export const expectedOutputSlice = createSlice({
    name:"expectedOutput",
    initialState:"",
    reducers:{
        setExpectedOutput:(state,action:PayloadAction<string>)=>{
            return action.payload
        }
    }
})

export const { setOutputValue } = outputSlice.actions;
export const {setInputValue} =inputSlice.actions
export const {setExpectedOutput}=expectedOutputSlice.actions

// reducers
export const outputReducer = outputSlice.reducer;
export const inputReducer = inputSlice.reducer;
export const expectedOutputReducer = expectedOutputSlice.reducer