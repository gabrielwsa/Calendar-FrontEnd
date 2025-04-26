import { Routes, Route, Navigate } from "react-router-dom"
import { LoginPage } from "../auth/pages"
import { CalendarPage } from "../calendar/pages"

export const AppRouter = () => {

    const authStatus = 'not-authenticated' // 'not-authenticated' // 'authenticated'

    return (
        <Routes>
            {/* QUALQUER COISA QUE COMECE COM AUTH */}
            {/* QUALQUER COISA QUE NÃO COMECE COM AUTH */}
            {
                (authStatus === 'not-authenticated')
                    ? <Route path="/auth/*" element={<LoginPage />} /> 
                    : <Route path="/*" element={<CalendarPage />} /> 
            }

            <Route path="/*" element={<Navigate to="/auth/login" />} />
        </Routes>
    )
}