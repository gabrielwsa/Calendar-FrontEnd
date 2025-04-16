import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { format, parse, startOfWeek, getDay, addHours } from 'date-fns'
import { enUS } from 'date-fns/locale/en-US'
import { Navbar } from '../'

const locales = {
    'en-US': enUS,
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})

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
  return (
    <>
        <Navbar />

        <Calendar 
            localizer={ localizer } 
            events={ events } 
            startAccessor="start" 
            endAccessor="end" 
            style={{ height: 500 }} 
        />
    </>
  )
}