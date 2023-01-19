import React from "react";
import styles from '../Settings/Settings.module.css'
import Popup from "reactjs-popup";

function DeleteAccount() {
    return(
        <Popup
            trigger={
                <div className={styles.deleteAccount}>
                    <button>Delete account</button>
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
                        <p>Are you sure you want to permanently delete your account?</p>
                        <div className={styles.submitDeleting}>
                            <button>Submit</button>
                        </div>
                    </div>
                )
            }
            }
        </Popup>
    )
}

export default DeleteAccount