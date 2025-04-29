import { useUiStore, useCalendarStore } from "../../hooks"
import "./styles/FabButtons.css";

export const FabAddNew = () => {
    
    const { isDateModalOpen, openDateModal } = useUiStore();
    const { setActiveEvent } = useCalendarStore();

    const onClickNew = () => {
        setActiveEvent({
            title: '',
            notes: '',
            start: new Date(),
            end: new Date(),
            bgColor: '#fafafa',
            user: {
                _id: '123',
                name: 'Juan',
            }
        });
        openDateModal();
    }


    return (
        <button className="fab-button fab-add" onClick={onClickNew}>
            <i className="fas fa-plus"></i>
        </button>
    )
}