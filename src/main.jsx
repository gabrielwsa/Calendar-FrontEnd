import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CalendarApp } from './CalendarApp.jsx'
import { BrowserRouter } from 'react-router-dom'
import './styles.css'

//* O CALENDARIO NAO FUNCIONA COM O MODO STRICT MODE LIGADO POR CONTA QUE JA ESTA DATADO
createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <BrowserRouter future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }}>
      <CalendarApp />
    </BrowserRouter>
  // </StrictMode>
)
