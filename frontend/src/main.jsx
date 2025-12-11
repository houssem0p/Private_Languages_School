import { StrictMode } from 'react'   // strictmode aide à detecter les problemes
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'  // appel de fichier app pour utiliser la fonction App()

createRoot(document.getElementById('root')).render(
  <StrictMode>                                            
    <App />
  </StrictMode>,
)
