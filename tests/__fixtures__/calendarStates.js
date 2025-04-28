
export const events = [
    {
        id: '1',
        title: 'Cumpleaños de Juan',
        start: new Date('2024-01-01 13:00:00'),
        end: new Date('2024-01-01 15:00:00'),
        notes: 'Cumpleaños de Juan - test event',
    },
    {
        id: '2',
        title: 'Cumpleaños de Maria',
        start: new Date('2024-01-02 13:00:00'),
        end: new Date('2024-01-02 15:00:00'),
        notes: 'Cumpleaños de Maria - test event',
    }
]

export const initialState = {
    isLoadingEvents: true,
    events: [],
    activeEvent: null
}

export const calendarWithEventsState = {
    isLoadingEvents: false,
    events: [...events],
    activeEvent: null
}

export const calendarWithActiveEventState = {
    isLoadingEvents: false,
    events: [...events],
    activeEvent: {...events[0]}
}

