import { useCalendarStore } from "../../hooks";

export const FabDelete = () => {

    const { DeletingEvent, activeEvent } = useCalendarStore();

    const handleDelete = () => {
        DeletingEvent();
    }

    return(
        <button className="btn btn-danger fab-delete" onClick={handleDelete} style={{ display: activeEvent ? '' : 'none' }}>
            <i className="fas fa-trash-alt"></i>
        </button>
    )
}