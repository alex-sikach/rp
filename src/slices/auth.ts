import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IAuthState, ILogin, IRegister} from "../declaration/interfaces";
import axios from "axios";

const initialState: IAuthState = {
    loggedIn: false,
    username: null,
    password: null,
    name: null,
    lastname: null,
    avatar: null,
    theme: null,
    error: null,
    loading: false
}

export const login = createAsyncThunk(
    'auth/login',
    async (credentials: ILogin, {rejectWithValue}) => {
        try {
            await axios({
                url: '/api' + '/auth' + '/login',
                method: 'POST',
                data: credentials,
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const user = await axios({
                url: '/api' + '/fetch' + '/profile',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return user.data
        } catch (e: any) {
            return rejectWithValue(e.response.data)
        }
    }
)
export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        //     state.loggedIn = false
        //     state.username = null
        //     state.password = null
        //     state.name = null
        //     state.lastname = null
        //     state.avatar = null
        //     state.theme = null
        // todo: making a request to server
    }
)
export const register = createAsyncThunk(
    'auth/register',
    async (credentials: IRegister) => {
        // todo: making a request to server
    }
)
export const deleteAccount = createAsyncThunk(
    'auth/deleteAccount',
    async () => {
        //     state.loggedIn = false
        //     state.username = null
        //     state.password = null
        //     state.name = null
        //     state.lastname = null
        //     state.avatar = null
        //     state.theme = null
        //     // todo: making a request to server
    }
)

export const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setData: (state: IAuthState, data: PayloadAction<Omit<IAuthState, "loggedIn" | "error" | "loading" | "password">>) => {
            state.loggedIn = true
            state.password = null
            state.username = data.payload.username
            state.name = data.payload.name
            state.lastname = data.payload.lastname
            state.avatar = data.payload.avatar
            state.theme = data.payload.theme
        },
        clearData: (state: IAuthState) => {
            state.loggedIn = false;
            state.username = null;
            state.password = null;
            state.name = null;
            state.lastname = null;
            state.avatar = null
            state.theme = null
        },
        setError: (state: IAuthState, data: PayloadAction<{error: string | null}>) => {
            state.error = data.payload.error
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state: IAuthState) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(login.fulfilled, (state: IAuthState) => {
            state.loading = false
            state.error = null;
            localStorage.setItem('authed', 'true')
        })
        builder.addCase(login.rejected, (state: IAuthState, action: any) => {
            state.loading = false;
            state.error = action.payload.message || 'Lost error message'
            localStorage.setItem('authed', 'false')
        })
        builder.addCase(logout.pending, (state: IAuthState) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(logout.fulfilled, (state: IAuthState) => {
            state.loading = false
            state.error = null
            localStorage.setItem('authed', 'false')
        })
        builder.addCase(logout.rejected, (state: IAuthState, action: any) => {
            state.loading = false;
            state.error = action.payload.message || 'Lost error message'
            localStorage.setItem('authed', 'false')
        })
        builder.addCase(register.pending, (state: IAuthState) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(register.fulfilled, (state: IAuthState) => {
            state.loading = false
            state.error = null
        })
        builder.addCase(register.rejected, (state: IAuthState, action: any) => {
            state.loading = false;
            state.error = action.payload.message || 'Lost error message'
        })
        builder.addCase(deleteAccount.pending, (state: IAuthState) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(deleteAccount.fulfilled, (state: IAuthState) => {
            state.loading = false
            state.error = null
        })
        builder.addCase(deleteAccount.rejected, (state: IAuthState, action: any) => {
            state.loading = false;
            state.error = action.payload.message || 'Lost error message'
        })
    }
})

export const {setData, clearData, setError} = auth.actions
export default auth.reducer