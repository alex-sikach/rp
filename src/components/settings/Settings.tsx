import React, {useEffect, useState} from "react";
import styles from './Settings.module.css'
import Input from "./Input";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import autoAvatar from "../../assets/images/auto-avatar.png";
import Unfulfilled from "./Unfulfilled";
import Popup from "reactjs-popup";
import {PopupActions} from "reactjs-popup/dist/types";

//todo: type the props
function Settings() {
    const avatar = useSelector((state: RootState) => state.auth.avatar)
    const name = useSelector((state: RootState) => state.auth.name) || 'name'
    const lastname = useSelector((state: RootState) => state.auth.lastname) || 'lastname'
    // todo: remove hardcode
    const todosRest = 9

    const editEl = React.useRef<HTMLImageElement>(null)
    const popup = React.useRef<PopupActions>(null)

    function showEditPanel() {
        if (editEl.current) {
            editEl.current.style.transform = 'none'
        } else {
            console.log('error')
        }
    }

    function hideEditPanel() {
        if (editEl.current) {
            editEl.current.style.transform = 'translateY(100%)'
        } else {
            console.log('error')
        }
    }

    const [screenWidth, setScreenWidth] = useState<number>(0)

    useEffect(() => {
        if (window.innerWidth <= 992) {
            showEditPanel()
        }
        window.addEventListener('resize', () => setScreenWidth(window.innerWidth))
    }, [])

    return (
        <div className={styles.main}>
            <div className={styles.wrapper}>
                <div className={styles.avatar}>
                    <div
                        className={styles.avatarImg}
                        onMouseEnter={() => {
                            if (window.innerWidth > 992) showEditPanel()
                        }}
                        onMouseLeave={() => {
                            if (window.innerWidth > 992) hideEditPanel()
                        }}
                    >
                        <img src={avatar || autoAvatar} alt="avatar"/>
                        <div ref={editEl} className={styles.editAvatar}>
                            <p>Edit</p>
                        </div>
                    </div>
                </div>
                <div className={styles.fullName}>
                    <Input name={name}/>
                    <Input name={lastname}/>
                </div>
                <div className={styles.theme}>
                    <p>Theme:</p>
                    <select defaultValue={'classic'}>
                        <option value={'classic'}>Classic</option>
                        <option value={'dark'}>Dark</option>
                        <option value={'christmas'}>Christmas</option>
                    </select>

                </div>
                {
                    window.innerWidth <= 992
                        ?
                        <>
                            <Popup
                                trigger={
                                <div>
                                    <i  className={styles.popupIcon + " fa-solid fa-clipboard-list"}></i>
                                </div>
                                }
                                modal
                                nested
                                ref={popup}
                            >
                                {/*@ts-ignore*/}
                                {close => {
                                        return (
                                            <div className={styles.popupWrapper}>
                                                <div className={styles.close} onClick={close}>
                                                    <i className="fa-solid fa-xmark"></i>
                                                </div>
                                                <Unfulfilled amount={todosRest} />
                                            </div>
                                        )
                                    }
                                }
                            </Popup>
                            <div className={styles.leave}>
                                <div className={styles.deleteAccount}>
                                    <button>Delete account</button>
                                </div>
                                <div className={styles.logout}>
                                    <button>Logout</button>
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <Unfulfilled amount={todosRest}/>
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
                            <div className={styles.logout}>
                                <button>Logout</button>
                            </div>
                        </>
                }
            </div>
        </div>
    )
}

export default Settings