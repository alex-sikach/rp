import React from 'react'
import Bar from "./Bar";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import autoAvatar from '../../assets/images/auto-avatar.png'
import styles from './Sidebar.module.css'
import MenuButton from "./MenuButton";

export interface BarProps {
    avatar: string,
    name: string,
    lastname: string
}

function Sidebar() {
    const ownAvatar = useSelector((state: RootState) => state.auth.avatar)
    const name = useSelector((state: RootState) => state.auth.name)
    const lastname = useSelector((state: RootState) => state.auth.lastname)
    const barPackage: BarProps = {
        avatar: ownAvatar || autoAvatar,
        name: name || '',
        lastname: lastname || ''
    }

    return(
        <div className={styles.main}>
            <Bar {...barPackage} />
            <MenuButton />
        </div>
    )
}

export default Sidebar