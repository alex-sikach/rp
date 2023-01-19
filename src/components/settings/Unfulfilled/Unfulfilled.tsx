import React from "react";
import styles from "../Settings/Settings.module.css";
import {UnfulfilledPopupProps} from "../types";

function Unfulfilled(props: UnfulfilledPopupProps) {
    return(
        <div className={styles.unfulfilled}><p>You have {props.todosRest} todos unfulfilled</p></div>
    )
}

export default Unfulfilled