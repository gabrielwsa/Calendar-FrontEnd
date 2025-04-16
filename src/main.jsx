import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CalendarApp } from './CalendarApp.jsx'
import { BrowserRouter } from 'react-router-dom'

//* O CALENDARIO NAO FUNCIONA COM O MODO STRICT MODE LIGADO POR CONTA QUE JA ESTA DATADO
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CalendarApp />
    </BrowserRouter>
  </StrictMode>
)
