import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        isLoadingEvents: true,
        events: [],
        activeEvent: null,
    },
    reducers: {
        /**
         * Define o evento que está atualmente ativo/selecionado no estado
         * @param {object} state - Estado atual do Redux
         * @param {object} payload - Evento que será definido como ativo
         */
        onSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload;
        },

        /**
         * Adiciona um novo evento ao array de eventos
         * Utiliza o método push() do JavaScript para adicionar ao final do array
         * Após adicionar, limpa o evento ativo setando como null
         * @param {object} state - Estado atual do Redux
         * @param {object} payload - Novo evento a ser adicionado
         */
        onAddNewEvent: (state, { payload }) => {
            state.events.push(payload);
            state.activeEvent = null;
        },

        /**
         * Atualiza um evento existente na lista
         * Usa o método map() para criar um novo array, substituindo apenas o evento específico
         * Compara o id do payload com cada evento para identificar qual deve ser atualizado
         * Após atualizar, limpa o evento ativo setando como null
         * @param {object} state - Estado atual do Redux
         * @param {object} payload - Evento atualizado com os novos dados
         */
        onUpdateEvent: (state, { payload }) => {
            state.events = state.events.map(event => event.id === payload.id ? payload : event);
            state.activeEvent = null;
        },

        /**
         * Remove o evento ativo da lista de eventos
         * Utiliza o método filter() para criar um novo array sem o evento ativo
         * Mantém apenas os eventos cujo id é diferente do evento ativo
         * Após remover, limpa o evento ativo setando como null
         * @param {object} state - Estado atual do Redux
         */
        onDeleteEvent: ( state ) => {
            state.events = state.events.filter(event => event.id !== state.activeEvent.id);
            state.activeEvent = null;
        },

        /**
         * Carrega eventos do servidor
         * Define o estado de carregamento como false
         * Limpa os eventos existentes e adiciona os novos eventos
         * @param {object} state - Estado atual do Redux
         * @param {object} payload - Eventos a serem carregados
         */
        onLoadEvents: (state, { payload = [] }) => {
            state.isLoadingEvents = false;
            state.events = [];
            payload.forEach(event => {
                state.events.push(event);
            });
        }
    }
});

export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents } = calendarSlice.actions;