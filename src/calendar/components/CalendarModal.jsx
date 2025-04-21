import Modal from 'react-modal'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { addHours } from 'date-fns'

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

    const [ formValues, setFormValues ] = useState({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours(new Date(), 2),
    });

    const onInputChange = ({ target }) => {
        //* COM ISSO PODEMOS ALTERAR SOMENTE O VALOR QUE MUDAR
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const onCloseModal = () => {
        console.log('onCloseModal');
        setIsOpen(false);
    }


    return (
      <Modal isOpen={isOpen} onRequestClose={onCloseModal} style={customStyles} className="modal" overlayClassName="modal-fondo" closeTimeoutMS={200} >
            <h1> Nuevo evento </h1>
            <hr />
            <form className="container grid">
                <div className="form-group mb-2">
                <label className='col-12'>Fecha y hora inicio</label>
                {/* 
                    * Quando selecionamos uma data no DatePicker:
                    * 1. O event recebido é um objeto Date (exemplo: 2024-03-20T10:30:00)
                    * 2. Fazemos spread (...formValues) para manter todos os outros valores do form (title, notes, end)
                    * 3. Atualizamos APENAS a propriedade 'start' com a nova data (start: event)
                    * 4. start: event - Aqui estamos atualizando especificamente a propriedade 'start' do estado formValues com o novo valor de data/hora selecionado no DatePicker. O 'event' contém o objeto Date com a nova data/hora escolhida pelo usuário. Isso permite que o formulário mantenha os valores anteriores (title, notes, end) e apenas atualize o campo de data/hora inicial.
                    * 5. Se o estado anterior era { title: "Reunião", notes: "", start: "2024-03-19", end: "2024-03-19" }
                    * 6. Ao selecionar 20/03/2024, ficará { title: "Reunião", notes: "", start: "2024-03-20", end: "2024-03-19" }
                    * 7. Apenas o start é atualizado, mantendo os outros valores intactos
                */}
                <DatePicker
                    className='form-control col-12'
                    selected={ formValues.start }
                    onChange={ (event) => setFormValues({ ...formValues, start: event }) }
                    dateFormat="Pp"
                />
                </div>

                <div className="form-group mb-2">
                <label className='col-12'>Fecha y hora fin</label>
                <DatePicker
                    minDate={ formValues.start }
                    className="form-control col-12"
                    selected={ formValues.end }
                    onChange={ (event) => setFormValues({ ...formValues, end: event }) }
                    dateFormat="Pp"
                />
                </div>

                <hr />
                <div className="form-group mb-2">
                <label>Titulo y notas</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Título del evento"
                    name="title"
                    autoComplete="off"
                    value={ formValues.title }
                    onChange={ onInputChange }
                />
                <small id="emailHelp" className="form-text text-muted">
                    Una descripción corta
                </small>
                </div>

                <div className="form-group mb-2">
                <textarea
                    type="text"
                    className="form-control"
                    placeholder="Notas"
                    rows="5"
                    name="notes"
                    value={ formValues.notes }
                    onChange={ onInputChange }
                ></textarea>
                <small id="emailHelp" className="form-text text-muted">
                    Información adicional
                </small>
                </div>

                <button type="submit" className="btn btn-outline-primary btn-block">
                <i className="far fa-save"></i>
                <span> Guardar</span>
                </button>
            </form>
      </Modal>
    );
}