import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const searchSlice = createSlice({
    name : 'search',
    initialState : {},
    reducers : {
        cacheResults : (state, action)=>{
            // state = {...state, ...action.payload}  //did not woek.. why??
            // state = { ...current(state), ...action.payload}  //did not woek

            // state = Object.assign(state, action.payload)
            return {...state, ...action.payload}
        }
    }
});

export const {cacheResults} = searchSlice.actions

export default searchSlice.reducer