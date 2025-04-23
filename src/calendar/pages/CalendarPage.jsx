import { useState } from 'react'
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { addHours } from 'date-fns'
import { Navbar, CalendarEvent, CalendarModal } from '../components'
import { localizer, getMessages } from '../helpers'
import { useUiStore, useCalendarStore } from '../../hooks';

export const CalendarPage = () => {

    const { openDateModal } = useUiStore();
    const { events, setActiveEvent } = useCalendarStore();

    //! Reconversão de strings ISO para objetos Date antes de renderizar para que o calendário funcione corretamente
    const parsedEvents = events.map(event => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
    }));

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week'); // SE NAO TEM LASTVIEW, SETA WEEK

    const eventStyleGetter = (event, start, end, isSelected) => { // SOMENTE PARA FINS DEMONSTRATIVOS DOQ VAMOS RECEBER NESSA FUNCAO
        const style = {
            backgroundColor: '#347cf7',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white'
        }

        return {
            style
        }
    }
  
    const onDoubleClick = (event) => {
        openDateModal();
    }

    const onSelect = (event) => {
        setActiveEvent(event);
    }

    const onViewChanged = (event) => {
        setLastView(event);
        localStorage.setItem('lastView', event);
    }

    return (
        <>
            <Navbar />

            <Calendar 
                culture='es'
                localizer={ localizer } 
                defaultView={ lastView }
                // defaultView='agenda' // SERVE PARA MOSTRA UMA VISTA POR DEFEITO
                events={ parsedEvents } 
                startAccessor="start" 
                endAccessor="end" 
                style={{ height: 500 }} 
                messages={ getMessages() }
                eventPropGetter={ eventStyleGetter }
                components={{
                    event: CalendarEvent
                }}
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelect }
                onView={ onViewChanged }
            />

            <CalendarModal />
        </>
    )
}