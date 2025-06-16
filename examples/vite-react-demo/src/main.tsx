import 'reflect-metadata';
import {DIProvider, containerByEnv} from "@mygoodstack/di-react/src";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

import './services/user.module';

const AppWithDIProvider = () => {
    const nodeEnv = process.env.NODE_ENV as keyof typeof containerByEnv
    console.log(`process.env.NODE_ENV : ${nodeEnv}`)

    const container = containerByEnv[nodeEnv]
    return (
        <DIProvider container={container}>
            <App/>
        </DIProvider>
    )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppWithDIProvider />
  </StrictMode>,
)
