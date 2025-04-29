import { useCalendarStore, useUiStore } from "../../hooks";
import "./styles/FabButtons.css";

export const FabDelete = () => {

    const { DeletingEvent, activeEvent } = useCalendarStore();
    const { isDateModalOpen } = useUiStore();

    const handleDelete = () => {
        DeletingEvent();
    }

    // Verificar se o evento ativo é válido (tem um ID)
    const isValidEvent = activeEvent && activeEvent.id;

    return(
        <button 
            className="fab-button fab-delete" 
            onClick={handleDelete} 
            style={{ display: (isValidEvent && !isDateModalOpen) ? '' : 'none' }}
        >
            <i className="fas fa-trash-alt"></i>
        </button>
    )
}