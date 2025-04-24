import { useCalendarStore, useUiStore } from "../../hooks";

export const FabDelete = () => {

    const { DeletingEvent, activeEvent } = useCalendarStore();
    const { isDateModalOpen } = useUiStore();

    const handleDelete = () => {
        DeletingEvent();
    }

    return(
        <button className="btn btn-danger fab-delete" onClick={handleDelete} style={{ display: (activeEvent && !isDateModalOpen) ? '' : 'none' }}>
            <i className="fas fa-trash-alt"></i>
        </button>
    )
}