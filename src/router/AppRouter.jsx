import { Routes, Route } from "react-router-dom"
import { LoginPage } from "../auth"
import { CalendarPage } from "../calendar"

export const AppRouter = () => {

    const authStatus = 'not-authenticated' // 'authenticated'

    return (
        <Routes>
            {/* {
                TODO:
                (authStatus === 'not-authenticated')
            } */}
            <Route path="/auth/*" element={<LoginPage />} /> {/* QUALQUER COISA QUE COMECE COM AUTH */}
            <Route path="/*" element={<CalendarPage />} /> {/* QUALQUER COISA QUE NÃO COMECE COM AUTH */}
        </Routes>
    )
}