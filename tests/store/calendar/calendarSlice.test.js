import { calendarSlice, onAddNewEvent, onSetActiveEvent, onUpdateEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar } from '../../../src/store/calendar/calendarSlice';
import { initialState, calendarWithEventsState, calendarWithActiveEventState, events } from '../../__fixtures__/calendarStates';

describe('calendarSlice', () => {
    test('should return the initial state', () => {
        const state = calendarSlice.getInitialState();
        expect(state).toEqual(initialState);
    });


    test('onSetActiveEvent should set the active event', () => {
        const state = calendarSlice.reducer(calendarWithEventsState, onSetActiveEvent(events[0]));
        expect(state.activeEvent).toEqual(events[0]);
    });

    test('onAddNewEvent should add a new event', () => {
        
        const newEvent = {
            id: '3',
            title: 'Cumpleaños de Pedro',
            start: new Date('2024-01-03 13:00:00'),
            end: new Date('2024-01-03 15:00:00'),
            notes: 'Cumpleaños de Pedro - test event'
        }

        const state = calendarSlice.reducer(calendarWithEventsState, onAddNewEvent(newEvent));
        expect(state.events).toEqual([...events, newEvent]);
    });

    test('onUpdateEvent should update an event', () => {
        const updatedEvent = {
            id: '1',
            title: 'Cumpleaños de Juan - updated',
            start: new Date('2024-01-01 13:00:00'),
            end: new Date('2024-01-01 15:00:00'),
            notes: 'Cumpleaños de Juan - updated event'
        }

        const state = calendarSlice.reducer(calendarWithEventsState, onUpdateEvent(updatedEvent));
        expect(state.events).toContain(updatedEvent);
    });

    test('onDeleteEvent should delete an event', () => {
        const state = calendarSlice.reducer(calendarWithActiveEventState, onDeleteEvent());
        expect(state.activeEvent).toBe(null);
        expect(state.events).not.toContain(events[0]);
    });

    test('onLoadEvents should set the events', () => {
        const state = calendarSlice.reducer(initialState, onLoadEvents(events));
        expect(state.isLoadingEvents).toBeFalsy();
        expect(state.events).toEqual(events)
    });

    test('onLogoutCalendar should clear the state', () => {
        const state = calendarSlice.reducer(calendarWithEventsState, onLogoutCalendar());
        expect(state).toEqual(initialState);
    });
});
