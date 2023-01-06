import React from "react";
import {Route, Routes} from "react-router-dom";
import Main from './components/main/Main'
import Register from './components/auth/register/Register'
import Login from './components/auth/login/Login'
import {useSelector} from "react-redux";
import {RootState} from "./store";

function App() {
    const localStorageMark = JSON.parse(localStorage.getItem('authed') || '{"authed": "false"}')
    const stateMark = useSelector((state: RootState) => state.auth.loggedIn)

    return ((localStorageMark.authed && Date.now() < localStorageMark.expires) || stateMark)
        ? <>
            <Routes>
                <Route index element={<Main/>}/>
                <Route path="/main/*" element={<Main/>}/>
                <Route path="/skills/*" element={null}/>
                <Route path="/projects/*" element={null}/>
                <Route path="/contact/*" element={null}/>
                <Route path="/settings/*" element={null}/>
            </Routes>
        </>
        : <>
            <Routes>
                <Route index element={<Login/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
            </Routes>
        </>
}

export default App