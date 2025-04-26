import { useSelector, useDispatch } from 'react-redux';
import { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } from '../store';
import { calendarApi } from '../api';
import { converEventsDate } from '../calendar/helpers';

export const useCalendarStore = () => {
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);
    const { user } = useSelector(state => state.auth);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    const startSavingEvent = async (calendarEvent) => {
        if (calendarEvent._id) {
            //* atualizando evento
            dispatch(onUpdateEvent({...calendarEvent}));
        } else {
            //* criando evento
            const { data } = await calendarApi.post('/events', calendarEvent);

            dispatch(onAddNewEvent({...calendarEvent, id: data.event._id, user}));
        }
    }

    const startLoadingEvents = async () => {
        try {
            const { data } = await calendarApi.get('/events');
            const events = converEventsDate(data.events);
            console.log(events);

        } catch (error) {
            console.log('Error al cargar eventos');
            console.log(error);
        }
    }

    const DeletingEvent = () => {
        dispatch(onDeleteEvent(activeEvent._id));
    }

    return {
        // Properties
        events,
        activeEvent,

        // Methods
        setActiveEvent,
        startSavingEvent,
        DeletingEvent,
        startLoadingEvents,
    }
}