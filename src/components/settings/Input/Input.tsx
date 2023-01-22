import React, {useEffect, useRef, useState} from "react";
import styles from './Input.module.css'

function Input(props: {name: string}) {
    const [inpValue, setInpValue] = useState<string>(props.name)
    const inp = useRef<HTMLInputElement>(null)
    const btn = useRef<HTMLImageElement>(null)
    const [err, setError] = useState<boolean>(false)

    const specialDigits = `!@#\$%^&*()_+-=[]{}\\|;:'",.<>/?` + String.fromCharCode(96) + "0123456789";

    function remove(s: string, target: string): string {
        const digits = s.split('')
        const targetDigits = target.split('')
        const res = digits.filter((d: string) => !targetDigits.includes(d))
        return res.join('')
    }

    function edit() {
        if(inp.current?.readOnly && btn.current?.className) {
            inp.current.readOnly = false;
            inp.current.disabled = false
            inp.current.focus()
            btn.current.className = "fa-sharp fa-solid fa-check"
        } else if(inp.current && !inp.current?.readOnly && btn.current?.className) {
            if(remove(inp.current.value.trim(), specialDigits).length < 2) {
                setInpValue(props.name)
                setError(true)
                setTimeout(() => {
                    setError(false)
                }, 6000)
            } else {
                setError(false)
            }
            inp.current.readOnly = true;
            inp.current.disabled = true
            btn.current.className = "fa-sharp fa-solid fa-pencil"
        }
    }
    function typingHandler() {
        setInpValue(inp.current?.value || '')
    }
    function keyDownHandler(e:React.KeyboardEvent) {
        if(e.key === 'Enter') {
            btn.current?.click()
        }
    }
    useEffect(() => {
        setInpValue(props.name)
    }, [props.name])
    return(
        <>
            <div className={styles.main}>
                <input
                    type="text"
                    ref={inp}
                    readOnly={true}
                    value={inpValue || ''}
                    disabled={true}
                    onKeyDown={keyDownHandler}
                    onChange={typingHandler}
                ></input>
                <div className={styles.edit} onClick={edit}>
                    <i ref={btn} className="fa-sharp fa-solid fa-pencil"></i>
                </div>
            </div>
            {err ?
                <div className={styles.error}>
                    <p>The input must include at least 2 letter.</p>
                </div>
                :
                ''
            }
        </>
    )
}

export default Input