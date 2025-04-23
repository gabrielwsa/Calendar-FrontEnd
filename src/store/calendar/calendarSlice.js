import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvent = {
        _id: new Date().getTime(),
        title: 'Cumpleaños de Gabriel',
        start: new Date().toISOString(),
        end: addHours(new Date(), 2).toISOString(),
        bgColor: '#fafafa',
        user: {
            _id: '1',
            name: 'Gabriel',
        }
};

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [
            tempEvent
        ],
        activeEvent: null,
    },
    reducers: {
        onSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload;
        },
        
    }
});

export const { onSetActiveEvent } = calendarSlice.actions;