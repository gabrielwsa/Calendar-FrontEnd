import { parseISO } from 'date-fns';

export const converEventsDate = (events = []) => {
    return events.map(event => ({
        ...event,
        id: event.id,
        end: parseISO(event.end),
        start: parseISO(event.start),
        user: event.user || { name: 'Usuário', _id: '0' }
    }));
}