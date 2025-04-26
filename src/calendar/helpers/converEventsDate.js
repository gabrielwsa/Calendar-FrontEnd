import { parseISO } from 'date-fns';

export const converEventsDate = (events = []) => {
    return events.map(event => ({
        ...event,
        _id: event.id,
        end: parseISO(event.end),
        start: parseISO(event.start),
    }));
}