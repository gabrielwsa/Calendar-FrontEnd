import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvent = {
        _id: new Date().getTime(),
        title: 'Cumpleaños de Gabriel',
        start: new Date(),
        end: addHours(new Date(), 2),
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

        onAddNewEvent: (state, { payload }) => {
            state.events.push(payload);
            state.activeEvent = null;
        },

        onUpdateEvent: (state, { payload }) => {
            state.events = state.events.map(event => event._id === payload._id ? payload : event);
            state.activeEvent = null;
        },
    }
});

export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent } = calendarSlice.actions;