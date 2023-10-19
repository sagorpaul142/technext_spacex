import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from "./App.tsx";
import {SpaceXLaunchesProvider} from "./context/SpaceXLaunchesContext.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <SpaceXLaunchesProvider>
            <App/>
        </SpaceXLaunchesProvider>
    </React.StrictMode>,
)
