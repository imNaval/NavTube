import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name : 'search',
    initialState : {
        searchResult: {},
        searchVideos: []
    },
    reducers : {
        cacheResults : (state, action)=>{
            // state = {...state, ...action.payload}  //did not woek.. why??
            // state = { ...current(state), ...action.payload}  //did not woek

            // state = Object.assign(state, action.payload)
            // return {...state, ...action.payload}
            state.searchResult = Object.assign(state.searchResult, action.payload)
        },
        saveSearchVideos: (state, action) => {
            state.searchVideos = action.payload
        },
        clearSearchVideos: (state) =>{
            state.searchVideos.length = 0;
        }
    }
});

export const {cacheResults, saveSearchVideos, clearSearchVideos} = searchSlice.actions

export default searchSlice.reducer