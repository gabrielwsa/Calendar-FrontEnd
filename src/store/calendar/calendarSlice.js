import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvent = {
        _id: new Date().getTime(),
        title: 'Cumpleaños de Gabriel',
        start: new Date(),
        end: addHours(new Date(), 2),
        bgColor: '#fafafa',
        user: {
            _id: '1',
            name: 'Gabriel',
        }
};

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [
            tempEvent
        ],
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
         * Compara o _id do payload com cada evento para identificar qual deve ser atualizado
         * Após atualizar, limpa o evento ativo setando como null
         * @param {object} state - Estado atual do Redux
         * @param {object} payload - Evento atualizado com os novos dados
         */
        onUpdateEvent: (state, { payload }) => {
            state.events = state.events.map(event => event._id === payload._id ? payload : event);
            state.activeEvent = null;
        },

        /**
         * Remove o evento ativo da lista de eventos
         * Utiliza o método filter() para criar um novo array sem o evento ativo
         * Mantém apenas os eventos cujo _id é diferente do evento ativo
         * Após remover, limpa o evento ativo setando como null
         * @param {object} state - Estado atual do Redux
         */
        onDeleteEvent: ( state ) => {
            state.events = state.events.filter(event => event._id !== state.activeEvent._id);
            state.activeEvent = null;
        },
    }
});

export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions;