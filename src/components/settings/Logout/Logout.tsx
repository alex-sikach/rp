import React from "react";
import styles from '../Settings/Settings.module.css'
import {logout} from "../../../slices/auth";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../store";
import {useNavigate} from "react-router-dom";

function Logout() {

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    function submit() {
        try {
            dispatch(logout(0))
        } catch (e) {
            console.log(e);
        } finally {
            navigate('/')
        }
    }
    return(
        <div className={styles.logout}>
            <button onClick={submit}>Logout</button>
        </div>
    )
}

export default Logout