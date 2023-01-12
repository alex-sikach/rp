import React from "react";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Main from './components/main/Main'
import Register from './components/auth/register/Register'
import Login from './components/auth/login/Login'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./store";
import {clearData, profile, setData} from "./slices/auth";
import Settings from "./components/settings/Settings";
import Sidebar from "./components/sidebar/Sidebar";

function App() {

    const dispatch = useDispatch()
    const location = useLocation()

    const localStorageMark = JSON.parse(localStorage.getItem('authed') || '{"authed": "false"}')
    const stateMark = useSelector((state: RootState) => state.auth.loggedIn)

    async function fetchProfile() {
        // @ts-ignore
        const user_data = await dispatch(profile(''));
        if(user_data.meta.requestStatus === 'fulfilled') {
            dispatch(setData(user_data.payload))
        } else if(user_data.meta.requestStatus === 'rejected') {
            dispatch(clearData())
        }
    }

    if(localStorageMark.authed && Date.now() < localStorageMark.expires && !stateMark) {
        fetchProfile()
    }
    if((localStorageMark.authed && Date.now() < localStorageMark.expires) || stateMark) {
        return(
            <>
                <Sidebar />
                <Routes>
                    <Route index element={<Main/>}/>
                    <Route path="/main/*" element={<Main/>}/>
                    <Route path="/skills/*" element={null}/>
                    <Route path="/projects/*" element={null}/>
                    <Route path="/contact/*" element={null}/>
                    <Route path="/settings/*" element={<Settings/>}/>
                </Routes>
            </>
        )
    } else {
        if(location.pathname === '/register') {
            return <Register/>
        }
        return <Login/>
    }
}

export default App