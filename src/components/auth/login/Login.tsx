import React from "react";
import './Login.css'
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {login as loginAC, setData, clearData, setError} from "../../../slices/auth";
import {ILogin} from "../../../declaration/interfaces";
import {RootState} from "../../../store";

function Login() {

    const dispatch = useDispatch()

    const error = useSelector((state: RootState) => state.auth.error)

    // FLUX needs
    const [loginValue, setLoginValue] = React.useState('')
    const [passwordValue, setPasswordValue] = React.useState('')


    const password = React.useRef<HTMLInputElement>(null);
    const login = React.useRef<HTMLInputElement>(null);
    const togglePasswordBtn = React.useRef<HTMLImageElement>(null);


    function togglePasswordType(): void {
        if (password.current?.type === 'password' && password.current.type && togglePasswordBtn.current?.className) {
            password.current.type = 'text'
            togglePasswordBtn.current.className = "fa-solid fa-eye-slash"
        } else if (password.current?.type === 'text' && password.current.type && togglePasswordBtn.current?.className) {
            password.current.type = 'password'
            togglePasswordBtn.current.className = "fa-solid fa-eye"
        }
    }

    async function loginSubmit() {

        if(
            loginValue.trim().length < 8
            || passwordValue.trim().length < 8
        ) {
            return dispatch(setError({
                error: 'Username and password must include at least 8 digits'
            }))
        }

        const credentials: ILogin = {
            username: loginValue,
            password: passwordValue
        }
        // @ts-ignore
        const user_data = await dispatch(loginAC(credentials));
        if(user_data.meta.requestStatus === 'fulfilled') {
            dispatch(setData(user_data.payload))
        } else if(user_data.meta.requestStatus === 'rejected') {
            dispatch(clearData())
        }
    }


    return (
        <div className="login-main">
            <div className="login-topLight login-light"></div>
            <div className="login-content">
                <div className="login-content-bg"></div>
                <div className="login-label">
                    <p>{
                        useSelector((state: RootState) => state.auth.loading)
                        ? 'Loading'
                        : 'Sign in'
                    }</p>
                </div>
                <div className="login-credentials">
                    <div className="login-username">
                        <input
                            type="text"
                            ref={login}
                            placeholder='Username'
                            value={loginValue}
                            onChange={() => setLoginValue(login.current?.value ?? 'error')}
                        />
                    </div>
                    <div className="login-password">
                        <input
                            type="password"
                            ref={password}
                            placeholder='Password'
                            value={passwordValue}
                            onChange={() => setPasswordValue(password.current?.value ?? 'error')}
                        />
                        <i className="fa-solid fa-eye" onClick={togglePasswordType} ref={togglePasswordBtn}></i>
                    </div>
                    {
                        error
                        ? <div><p className="login-credentials-error">{error}</p></div>
                        : ''
                    }
                </div>
                <div className="login-footer">
                    <button onClick={loginSubmit} className="login-btn-fancy">
                        <span className="login-btn-top-key"></span>
                        <span className="login-btn-text">Login</span>
                        <span className="login-btn-bottom-key-1"></span>
                        <span className="login-btn-bottom-key-2"></span>
                    </button>
                    <Link to="/registration">Have no account?</Link>
                </div>
            </div>
            <div className="login-bottomLight login-light"></div>
        </div>
    )
}

export default Login