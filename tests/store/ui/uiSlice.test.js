import { uiSlice, onOpenDateModal, onCloseDateModal } from '../../../src/store/ui/uiSlice';

describe('uiSlice', () => {
    test('should return the initial state', () => {
        expect(uiSlice.getInitialState()).toEqual({
            isDateModalOpen: false
        });
    });

    test('should toggle the date modal', () => {
        let state = uiSlice.getInitialState();
        state = uiSlice.reducer(state, onOpenDateModal());
        expect(state.isDateModalOpen).toBe(true);

        state = uiSlice.reducer(state, onCloseDateModal());
        expect(state.isDateModalOpen).toBe(false);
    });
    
});