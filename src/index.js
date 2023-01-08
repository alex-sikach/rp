import React from 'react'
import {createRoot} from "react-dom/client";
import {store} from './store'
import {Provider} from 'react-redux'
import {BrowserRouter} from "react-router-dom";
import App from './App'
import './index.css'

console.log("%cIf you accidentally changed your cookie - session just delete this cookie at all, delete local storage - authed and refresh the page.", "color: blue; font-size: 20px")
const container = document.getElementById('root')
const root = createRoot(container)
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>
)
