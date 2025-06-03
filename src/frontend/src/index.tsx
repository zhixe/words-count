import {type ReactDOM, StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import React from 'react';
import {ConfigProvider} from "antd";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
    <React.StrictMode>
        <ConfigProvider>
            <App />
        </ConfigProvider>
    </React.StrictMode>
);