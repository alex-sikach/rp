import React from "react";
import styles from "./Settings.module.css";

function Unfulfilled(props: {amount: number}) {
    return(
        <div className={styles.unfulfilled}><p>You have {props.amount} todos unfulfilled</p></div>
    )
}

export default Unfulfilled