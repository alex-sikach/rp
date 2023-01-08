import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ISidebarState {
    showed: boolean
}

const initialState = {
    showed: false
} as ISidebarState

export const sidebar = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        toggleSidebar: (state, action: PayloadAction<boolean>) => {
            state.showed = action.payload
        }
    }
})

export const {toggleSidebar} = sidebar.actions
export default sidebar.reducer