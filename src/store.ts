import { configureStore } from "@reduxjs/toolkit";
import auth from './slices/auth'
import sidebar from "./slices/sidebar";

export const store = configureStore({
    reducer: {
        auth,
        sidebar
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch