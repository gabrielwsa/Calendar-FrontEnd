import Modal from 'react-modal'
import { useState } from 'react'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        zIndex: 999
    }
};

Modal.setAppElement('#root');

export const CalendarModal = () => {

    const [ isOpen, setIsOpen ] = useState(true);

    const onCloseModal = () => {
        console.log('onCloseModal');
        setIsOpen(false);
    }


    return (
        <Modal isOpen={ isOpen } onRequestClose={ onCloseModal } style={ customStyles } className="modal" overlayClassName="modal-fondo" closeTimeoutMS={ 200 }>
            <h1>Calendar Modal</h1>
            <hr />
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius, ratione delectus explicabo asperiores repellendus ea! Odio, sunt. Quia, repellat perspiciatis dolorem aut atque veniam possimus natus distinctio, vel rerum impedit!</p>
        </Modal>
    )
}