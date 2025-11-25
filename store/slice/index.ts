import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const outputSlice = createSlice({
    name:'output',
    initialState:"Output will show here",
    reducers:{
        setOutputValue:(state,action:PayloadAction<string>)=>{
            return action.payload          
        }
    }
})
export const { setOutputValue } = outputSlice.actions;
export default outputSlice.reducer;