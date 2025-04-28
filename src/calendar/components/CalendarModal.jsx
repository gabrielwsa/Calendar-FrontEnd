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
        zIndex: 999
    }
};

// Estilo para garantir que o DatePicker fique por cima do modal
const datePickerStyles = `
  .react-datepicker-popper {
    z-index: 1000 !important;
  }
  .react-datepicker-wrapper {
    width: 100%;
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
    const { activeEvent, startSavingEvent } = useCalendarStore();
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
                    showTimeSelect
                    locale="es"
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
                    showTimeSelect
                    locale="es"
                />
                </div>

                <hr />
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
                {/* 
                  * Campo de notas do evento - protegido pelo mecanismo de bloqueio
                  * Quando o usuário edita este campo e tenta salvar, 
                  * o backend verifica se ele é o proprietário do evento
                  * antes de permitir a atualização
                */}
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
      </>
    );
}