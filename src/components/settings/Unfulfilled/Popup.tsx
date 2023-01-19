import React from 'react'
import styles from "../Settings/Settings.module.css";
import Unfulfilled from "./Unfulfilled";
import Popup from "reactjs-popup";
import {UnfulfilledPopupProps} from "../types";

function UnfulfilledPopup(props: UnfulfilledPopupProps) {
    return (
        <Popup
            trigger={
                <div>
                    <i  className={styles.popupIcon + " fa-solid fa-clipboard-list"}></i>
                </div>
            }
            modal
            nested
        >
            {/*@ts-ignore*/}
            {close => {
                return (
                    <div className={styles.popupWrapper}>
                        <div className={styles.close} onClick={close}>
                            <i className="fa-solid fa-xmark"></i>
                        </div>
                        <Unfulfilled todosRest={props.todosRest} />
                    </div>
                )
            }
            }
        </Popup>
    )
}

export default UnfulfilledPopup