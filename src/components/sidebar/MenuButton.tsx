import React from "react";
import styles from './MenuButton.module.css'
import {useDispatch} from "react-redux";
import {toggleSidebar} from "../../slices/sidebar";

function MenuButton() {

    const dispatch = useDispatch()

    function show() {
        dispatch(toggleSidebar(true))
    }

    return(
        <div
            className={styles.main}
            onClick={show}
        >
            <i className="fa-solid fa-bars"></i>
        </div>
    )
}

export default MenuButton