import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name : "app",
    initialState: {
        isMenuOpen : false,
        isDark : true
    },
    reducers : {
        toggleMenu : (state) =>{
            state.isMenuOpen = !state.isMenuOpen
        },
        closeMenu : (state) =>{
            state.isMenuOpen = false
        },
        toggleDark : (state) =>{
            state.isDark = !state.isDark
        }
    }
});

export default appSlice.reducer;

export const {toggleMenu, closeMenu, toggleDark} = appSlice.actions;