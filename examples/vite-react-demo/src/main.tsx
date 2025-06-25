import 'reflect-metadata';
import {containerByEnv as containerByEnvCore} from "@mygoodstack/di-core";
import {containerByEnv, DIProvider} from "@mygoodstack/di-react";
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App'

import './i18n';
import './services/user.module';

const AppWithDIProvider = () => {
    const nodeEnv = process.env.NODE_ENV as keyof typeof containerByEnv
    console.log(`process.env.NODE_ENV : ${nodeEnv}`)

    console.log(`containerByEnv equals : ${containerByEnv === containerByEnvCore}`)

    const container = containerByEnv[nodeEnv]
    return (
        <DIProvider container={container}>
            <App/>
        </DIProvider>
    )
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AppWithDIProvider/>
    </StrictMode>,
)
