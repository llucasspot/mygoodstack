import 'reflect-metadata';
import {containerByEnv as containerByEnvCore, ContainerI} from "@mygoodstack/di-core";
import {containerByEnv, DIProvider} from "@mygoodstack/di-react";
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App'

import './i18n';
import './services/user.module';

const nodeEnv = import.meta.env.VITE_APP_ENV as keyof typeof containerByEnv
console.log(`process.env.NODE_ENV : ${nodeEnv}`)
console.log(`containerByEnv equals : ${containerByEnv === containerByEnvCore}`)
const container: ContainerI = containerByEnv[nodeEnv]

container.consoleLog()

const AppWithDIProvider = () => {

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
