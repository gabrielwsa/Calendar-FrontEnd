import Modal from 'react-modal'
import { useMemo, useState, useEffect } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { addHours, differenceInSeconds } from 'date-fns'
import es from 'date-fns/locale/es'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import { useUiStore, useCalendarStore } from '../../hooks';
registerLocale('es', es)


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
        zIndex: 1000
    }
};

// Estilo para garantir que o DatePicker fique por cima do modal
const datePickerStyles = `
  .react-datepicker-popper {
    z-index: 10001 !important;
  }
  .react-datepicker-wrapper {
    width: 100%;
    position: relative;
    z-index: 2000 !important;
  }
  .react-datepicker__input-container {
    width: 100%;
  }
  .form-group {
    position: relative;
  }
`;

Modal.setAppElement('#root');

/**
 * Componente de modal para criação e edição de eventos do calendário
 * Este componente permite a edição das notas do evento
 * O mecanismo de bloqueio para outros usuários é implementado no backend
 * Quando o usuário tenta salvar as alterações, a requisição é enviada ao backend
 * onde é verificado se o usuário tem permissão para editar o evento
 */
export const CalendarModal = () => {

    const { isDateModalOpen, closeDateModal } = useUiStore();
    // startSavingEvent é responsável por enviar a requisição ao backend
    // onde o mecanismo de bloqueio por usuário é aplicado
    const { activeEvent, startSavingEvent, clearActiveEvent } = useCalendarStore();
    const [ formSubmitted, setFormSubmitted ] = useState(false);
    const [ formValues, setFormValues ] = useState({
        title: '',
        notes: '', // Campo de notas que será protegido pelo mecanismo de bloqueio
        start: new Date(),
        end: addHours(new Date(), 2),
    });

    // Quando um evento é selecionado para edição, carregamos seus dados no formulário
    useEffect(() => {
        if (activeEvent !== null) {
            setFormValues({...activeEvent});
        }
    }, [activeEvent])

    const titleClass = useMemo(() => {

        if(!formSubmitted) return '';

        return (formValues.title.length > 0) ? 'is-valid' : 'is-invalid';

    }, [ formValues.title, formSubmitted ])

    // Função para atualizar os valores do formulário, incluindo as notas
    const onInputChange = ({ target }) => {
        //* COM ISSO PODEMOS ALTERAR SOMENTE O VALOR QUE MUDAR
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const onCloseModal = () => {
        closeDateModal();
        // Limpa o evento ativo quando o modal é fechado sem salvar
        // Isso evita que o botão de excluir apareça indevidamente
        if (!activeEvent?.id) {
            clearActiveEvent();
        }
    }

    /**
     * Função que processa o envio do formulário
     * Quando o usuário salva as alterações, esta função é chamada
     * Ela envia os dados para o backend através de startSavingEvent
     * No backend, o mecanismo de bloqueio verifica se o usuário tem permissão para editar
     * Se não tiver permissão, o backend retornará um erro 401
     */
    const onSubmit = async ( event ) => {
        event.preventDefault();
        setFormSubmitted(true);
    
        const difference = differenceInSeconds(formValues.end, formValues.start);
        if(isNaN(difference) || difference <= 0) {
            Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error');
            return;
        }

        if(formValues.title.length <= 0) return;

        // Esta chamada envia os dados ao backend onde a verificação de propriedade ocorre
        // Se o usuário não for o proprietário do evento, o backend retornará erro
        await startSavingEvent(formValues);
        closeDateModal();
    }


    return (
      <>
        <style>{datePickerStyles}</style>
        <Modal isOpen={isDateModalOpen} onRequestClose={onCloseModal} style={customStyles} className="modal" overlayClassName="modal-fondo" closeTimeoutMS={200} >
            <h1> Nuevo evento </h1>
            <hr />
            <form className="container grid" onSubmit={onSubmit}>
                
                {/* Campos de data - agora em uma div separada com z-index maior */}
                <div className="date-fields-container" style={{ position: 'relative', zIndex: 2000 }}>
                    <div className="form-group mb-2" style={{ position: 'relative', zIndex: 3000 }}>
                        <label className='col-12'>Fecha y hora inicio</label>
                        <div style={{ position: 'relative', zIndex: 9999 }}>
                            <DatePicker
                                className='form-control col-12'
                                selected={ formValues.start }
                                onChange={ (event) => setFormValues({ ...formValues, start: event }) }
                                dateFormat="Pp"
                                showTimeSelect
                                locale="es"
                                popperClassName="date-picker-popper-higher"
                            />
                        </div>
                    </div>

                    <div className="form-group mb-2" style={{ position: 'relative', zIndex: 2500 }}>
                        <label className='col-12'>Fecha y hora fin</label>
                        <div style={{ position: 'relative', zIndex: 8888 }}>
                            <DatePicker
                                minDate={ formValues.start }
                                className="form-control col-12"
                                selected={ formValues.end }
                                onChange={ (event) => setFormValues({ ...formValues, end: event }) }
                                dateFormat="Pp"
                                showTimeSelect
                                locale="es"
                                popperClassName="date-picker-popper-higher"
                            />
                        </div>
                    </div>
                </div>

                <hr />
                
                {/* Demais campos com z-index menor */}
                <div className="other-fields-container" style={{ position: 'relative', zIndex: 1000 }}>
                    <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${titleClass}`}
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
                </div>

                <button type="submit" className="btn btn-outline-primary btn-block">
                <i className="far fa-save"></i>
                <span> Guardar</span>
                </button>
            </form>
      </Modal>
      </>
    );
}