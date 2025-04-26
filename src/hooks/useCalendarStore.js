import { useSelector, useDispatch } from 'react-redux';
import { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents } from '../store';
import { calendarApi } from '../api';
import { converEventsDate } from '../calendar/helpers';
import Swal from 'sweetalert2';

export const useCalendarStore = () => {
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);
    const { user } = useSelector(state => state.auth);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    const startSavingEvent = async (calendarEvent) => {
        try {
            if (calendarEvent.id) {
                //* atualizando evento
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
                dispatch(onUpdateEvent({ ...calendarEvent, user }));
            }
            //* criando evento
            const { data } = await calendarApi.post('/events', calendarEvent);
            dispatch(onAddNewEvent({ ...calendarEvent, id: data.id, user }));

        } catch (error) {
            console.log('Erro ao salvar evento');
            Swal.fire('Error al guardar', error.response.data.msg, 'error');
        }
    }

    const startLoadingEvents = async () => {
        try {
            const { data } = await calendarApi.get('/events');
            const events = converEventsDate(data.events);
            dispatch(onLoadEvents(events));
            console.log(events);

        } catch (error) {
            console.log('Error al cargar eventos');
            console.log(error);
        }
    }

    const DeletingEvent = async() => {
        try {
            await calendarApi.delete(`/events/${activeEvent.id}`);
            dispatch(onDeleteEvent());
        } catch (error) {
            console.log('Error al eliminar evento');
            Swal.fire('Error al eliminar evento', error.response.data.msg, 'error');
        }
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