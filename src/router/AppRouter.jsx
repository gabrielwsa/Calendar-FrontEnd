import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom"
import { LoginPage } from "../auth/pages"
import { CalendarPage } from "../calendar/pages"
import { useAuthStore } from "../hooks/useAuthStore";

export const AppRouter = () => {

    const { checkAuthToken, status } = useAuthStore();
    const authStatus = status;

    useEffect(() => {
        checkAuthToken();
    }, []);

    return (
        <Routes>
            {/* QUALQUER COISA QUE COMECE COM AUTH */}
            {/* QUALQUER COISA QUE NÃO COMECE COM AUTH */}
            {
                (authStatus === 'not-authenticated')
                    ? (
                        <>
                            <Route path="/auth/*" element={<LoginPage />} />    
                            <Route path="/*" element={<Navigate to="/auth/login" />} />
                        </>
                    )
                    : (
                        <>
                            <Route path="/" element={<CalendarPage />} />
                            <Route path="/*" element={<Navigate to="/" />} />
                        </>
                    )
            }

            <Route path="/*" element={<Navigate to="/auth/login" />} />
        </Routes>
    )
}