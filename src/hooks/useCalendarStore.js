import { useSelector, useDispatch } from 'react-redux';
import { onSetActiveEvent, onAddNewEvent, onUpdateEvent } from '../store';

export const useCalendarStore = () => {
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    const startSavingEvent = async (calendarEvent) => {
        if (calendarEvent._id) {
            dispatch(onUpdateEvent({...calendarEvent}));
        } else {
            dispatch(onAddNewEvent({...calendarEvent, _id: new Date().getTime()}));
        }
    }

    return {
        // Properties
        events,
        activeEvent,

        // Methods
        setActiveEvent,
        startSavingEvent,
    }
}