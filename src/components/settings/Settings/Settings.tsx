import React, {useEffect, useState} from "react";
import styles from './Settings.module.css'
import Input from "../Input/Input";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import autoAvatar from "../../../assets/images/auto-avatar.png";
import Unfulfilled from "../Unfulfilled/Unfulfilled";
import DeleteAccount from "../DeleteAccount/DeleteAccount";
import UnfulfilledPopup from "../Unfulfilled/Popup";
import {UnfulfilledPopupProps} from "../types";
import Logout from "../Logout/Logout";

//todo: type the props
function Settings() {
    const avatar = useSelector((state: RootState) => state.auth.avatar)
    const name = useSelector((state: RootState) => state.auth.name) || 'name'
    const lastname = useSelector((state: RootState) => state.auth.lastname) || 'lastname'
    // todo: remove hardcode
    const todosRest = 9
    const UnfulfilledProps: UnfulfilledPopupProps = {
        todosRest
    }

    const editEl = React.useRef<HTMLImageElement>(null)

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
                            <UnfulfilledPopup {...UnfulfilledProps} />
                            <div className={styles.leave}>
                                <DeleteAccount />
                                <Logout />
                            </div>
                        </>
                        :
                        <>
                            <Unfulfilled {...UnfulfilledProps} />
                            <DeleteAccount />
                            <Logout />
                        </>
                }
            </div>
        </div>
    )
}

export default Settings