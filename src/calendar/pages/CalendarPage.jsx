import { useState, useEffect } from 'react'
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { Navbar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from '../components'
import { localizer, getMessages } from '../helpers'
import { useUiStore, useCalendarStore, useAuthStore } from '../../hooks';


export const CalendarPage = () => {

    const { user } = useAuthStore();
    const { openDateModal } = useUiStore();
    const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week'); // SE NAO TEM LASTVIEW, SETA WEEK

    const eventStyleGetter = (event, start, end, isSelected) => { // SOMENTE PARA FINS DEMONSTRATIVOS DOQ VAMOS RECEBER NESSA FUNCAO
        
        const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid);


        const style = {
            backgroundColor: isMyEvent ? '#347cf7' : 'grey',
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

    useEffect(() => {
        startLoadingEvents();
    }, []);

    return (
        <>
            <Navbar />

            <Calendar 
                culture='es'
                localizer={ localizer } 
                defaultView={ lastView }
                // defaultView='agenda' // SERVE PARA MOSTRA UMA VISTA POR DEFEITO
                events={ events } 
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

            <FabAddNew />
            <FabDelete />
        </>
    )
}