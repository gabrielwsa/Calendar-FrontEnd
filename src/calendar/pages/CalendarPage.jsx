import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { addHours } from 'date-fns'
import { Navbar } from '../components'
import { localizer, getMessages } from '../helpers'


const events = [
    {
        title: 'Cumpleaños de Gabriel',
        start: new Date(),
        end: addHours(new Date(), 2),
        bgColor: '#fafafa',
        user: {
            _id: '1',
            name: 'Gabriel',
        }
    }
]

export const CalendarPage = () => {
  
    const eventStyleGetter = (event, start, end, isSelected) => {
        console.log({ event, start, end, isSelected })
    }


  return (
    <>
        <Navbar />

        <Calendar 
            culture='es'
            localizer={ localizer } 
            events={ events } 
            startAccessor="start" 
            endAccessor="end" 
            style={{ height: 500 }} 
            messages={ getMessages() }
            eventPropGetter={ eventStyleGetter }
        />
    </>
  )
}