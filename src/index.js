import React from 'react'
import {createRoot} from "react-dom/client";
import {store} from './store'
import {Provider} from 'react-redux'
import {BrowserRouter} from "react-router-dom";
import App from './App'
import './index.css'

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>
)
