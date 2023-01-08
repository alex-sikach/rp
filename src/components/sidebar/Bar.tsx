import React, {useEffect, useRef} from "react";
import {Link} from "react-router-dom";
import {BarProps} from "./Sidebar";
import styles from './Bar.module.css'
import {toggleSidebar} from "../../slices/sidebar";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";

function Bar(props: BarProps) {

    const dispatch = useDispatch()

    const bar = useRef<HTMLDivElement>(null)
    const links = useRef<HTMLDivElement>(null)

    const showed = useSelector((state: RootState) => state.sidebar.showed)

    function close() {
        dispatch(toggleSidebar(false))
    }

    useEffect(() => {
        links.current?.childNodes.forEach((l) => {
            l.addEventListener('click', close)
        })
    }, [])

    return(
            <div
                className={styles.main}
                ref={bar}
                style={{ transform: showed ? 'translateX(0)' : 'translateX(-100%)'}}
            >
                <div className={styles.header}>
                    <div className={styles.profile}>
                        <img src={props.avatar} alt="avatar" className={styles.avatar}></img>
                        <div className={styles.fullName}>
                            <p className={styles.name}>{props.name}</p>
                            <p className={styles.lastname}>{props.lastname}</p>
                        </div>
                    </div>
                    <div className={styles.close} onClick={close}>
                        <i className="fa-solid fa-xmark"></i>
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles.links} ref={links}>
                        <Link to="/main">Main</Link>
                        <Link to="/skills">Skills</Link>
                        <Link to="/projects">Projects</Link>
                        <Link to="/contact">Contact me</Link>
                        <Link to="/settings">Settings</Link>
                    </div>
                </div>
            </div>
    )
}

export default Bar