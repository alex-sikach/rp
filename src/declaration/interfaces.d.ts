import {theme} from "../declaration/types";

export interface IAuthState {
    loggedIn: boolean
    username: string | null
    password: string | null
    name: string | null
    lastname: string | null
    avatar: string | null
    theme: theme | null,
    error: string | null,
    loading: boolean
}

export type ILogin = Pick<IAuthState, "username" | "password">
export type IRegister = Pick<IAuthState, "username" | "name" | "lastname" | "password">