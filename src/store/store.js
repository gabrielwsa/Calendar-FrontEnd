import { configureStore } from '@reduxjs/toolkit';
import { uiSlice, calendarSlice } from './';

export const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        calendar: calendarSlice.reducer,
    },

    //! PARA EVITAR O ERRO DE SERIALIZATION DO REDUX
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});