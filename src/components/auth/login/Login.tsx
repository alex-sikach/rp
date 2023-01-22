import React from "react";
import styles from './Login.module.css'
import bg from '../bg.module.css'
import btn from '../submit.module.css'
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {login as loginAC, setData, setError} from "../../../slices/auth";
import {ILogin} from "../../../types/interfaces";
import {RootState} from "../../../store";

function Login() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

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

    function loginOnKeyDown(e:React.KeyboardEvent) {
        if(e.key === 'Enter') {
            password.current?.focus()
        }
    }
    function passwordOnKeyDown(e:React.KeyboardEvent) {
        if(e.key === 'Enter') {
            loginSubmit()
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
            navigate('/')
        }
    }


    return (
        <div className={styles.main}>
            <div className={styles.topLight + " " + styles.light}></div>
            <div className={styles.content}>
                <div className={bg.contentBg + " " + styles.contentBg}></div>
                <div className={styles.label}>
                    <p>{
                        useSelector((state: RootState) => state.auth.loading)
                        ? 'Loading'
                        : 'Sign in'
                    }</p>
                </div>
                <div className={styles.credentials}>
                    <div className={styles.username}>
                        <input
                            type="text"
                            ref={login}
                            placeholder='Username'
                            value={loginValue}
                            onKeyDown={loginOnKeyDown}
                            onChange={() => setLoginValue(login.current?.value ?? 'error')}
                        />
                    </div>
                    <div className={styles.password}>
                        <input
                            type="password"
                            ref={password}
                            placeholder='Password'
                            value={passwordValue}
                            onKeyDown={passwordOnKeyDown}
                            onChange={() => setPasswordValue(password.current?.value ?? 'error')}
                        />
                        <i className="fa-solid fa-eye" onClick={togglePasswordType} ref={togglePasswordBtn}></i>
                    </div>
                    {
                        error
                        ? <div><p className={styles.credentialsError}>{error}</p></div>
                        : ''
                    }
                </div>
                <div className={styles.footer}>
                    <button onClick={loginSubmit} className={btn.btnFancy + " " + styles.btnFancy}>
                        <span className={btn.btnTopKey}></span>
                        <span className={btn.btnText + " " + styles.btnText}>Login</span>
                        <span className={btn.btnBottomKey1}></span>
                        <span className={btn.btnBottomKey2}></span>
                    </button>
                    <Link to="/register">Have no account?</Link>
                </div>
            </div>
            <div className={styles.bottomLight + " " + styles.light}></div>
        </div>
    )
}

export default Login