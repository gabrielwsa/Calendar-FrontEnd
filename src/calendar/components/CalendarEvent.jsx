import { memo } from "react";
import "./styles/CalendarEvent.css";

export const CalendarEvent = memo(({ event }) => {
    
    const { title, user, notes } = event;

    return(
        <div className="calendar-event">
            <div className="calendar-event-title">{ title }</div>
            {notes && <div className="calendar-event-notes">{ notes }</div>}
            <div className="calendar-event-user">{ user.name }</div>
        </div>
    )
})