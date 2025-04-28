import { useSelector, useDispatch } from 'react-redux';
import { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents } from '../store';
import { calendarApi } from '../api';
import { converEventsDate } from '../calendar/helpers';
import Swal from 'sweetalert2';

/**
 * Hook personalizado para gerenciar o estado e as operações relacionadas aos eventos do calendário
 * Gerencia as ações que envolvem a edição de eventos, incluindo o campo de notas
 * Implementa a comunicação com o backend onde o mecanismo de bloqueio por usuário é aplicado
 */
export const useCalendarStore = () => {
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);
    const { user } = useSelector(state => state.auth);

    /**
     * Define um evento como ativo no estado do Redux
     * Chamado quando o usuário seleciona um evento para visualização ou edição
     * @param {object} calendarEvent - Evento a ser definido como ativo
     */
    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    /**
     * Salva um evento no backend e atualiza o estado local
     * Esta função é a que interage com o backend onde o mecanismo de bloqueio é implementado
     * Se o usuário tentar editar um evento que não criou, o backend retornará erro 401
     * @param {object} calendarEvent - Evento a ser salvo ou atualizado
     */
    const startSavingEvent = async (calendarEvent) => {
        try {
            if (calendarEvent.id) {
                // Atualização de evento existente (PUT)
                // Aqui ocorre a verificação de propriedade no backend
                // Se o usuário não for o proprietário, o backend retornará erro 401
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
                dispatch(onUpdateEvent({ ...calendarEvent, user }));
                return; // Importante adicionar return para evitar a execução do código abaixo
            }
            // Criação de novo evento (POST)
            // Não há verificação de propriedade, pois é um novo evento
            const { data } = await calendarApi.post('/events', calendarEvent);
            dispatch(onAddNewEvent({ ...calendarEvent, id: data.id, user }));

        } catch (error) {
            console.log('Erro ao salvar evento');
            // Exibe mensagem de erro recebida do backend
            // Isso inclui a mensagem 'You are not allowed to edit this event'
            // quando o usuário tenta editar um evento que não criou
            Swal.fire('Error al guardar', error.response.data.msg, 'error');
        }
    }

    /**
     * Carrega todos os eventos do backend
     */
    const startLoadingEvents = async () => {
        try {
            const { data } = await calendarApi.get('/events');
            const events = converEventsDate(data.events);
            dispatch(onLoadEvents(events));
            console.log(events);

        } catch (error) {
            console.log('Error al cargar eventos');
            console.log(error);
        }
    }

    /**
     * Exclui o evento ativo
     * Também está sujeito ao mecanismo de bloqueio no backend
     * Apenas o criador do evento pode excluí-lo
     */
    const DeletingEvent = async() => {
        try {
            // Aqui também ocorre a verificação de propriedade no backend
            // Se o usuário não for o proprietário, o backend retornará erro 401
            await calendarApi.delete(`/events/${activeEvent.id}`);
            dispatch(onDeleteEvent());
        } catch (error) {
            console.log('Error al eliminar evento');
            // Similar ao startSavingEvent, exibe mensagem de erro do backend
            Swal.fire('Error al eliminar evento', error.response.data.msg, 'error');
        }
    }

    return {
        // Propriedades
        events,
        activeEvent,

        // Métodos
        setActiveEvent,
        startSavingEvent,
        DeletingEvent,
        startLoadingEvents
    }
}