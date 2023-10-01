import { createSlice } from "@reduxjs/toolkit";
import { LIVE_CHAT_LIMIT } from "./constant";

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        messages: [],
    },
    reducers: {
        addMessage: (state, action)=>{
            // state.messages.push(action.payload)
            state.messages.unshift(action.payload)

            state.messages.splice(LIVE_CHAT_LIMIT, 1)
        }
    }
});

export default chatSlice.reducer

export const {addMessage} = chatSlice.actions