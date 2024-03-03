import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import FirebaseProvider from './contexts/FirebaseProvider.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
    <FirebaseProvider>
    <App />
    </FirebaseProvider>
)
