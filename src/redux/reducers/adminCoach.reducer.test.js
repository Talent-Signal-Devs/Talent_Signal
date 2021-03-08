import adminCoachReducer from './adminCoach.reducer';

describe('testing adminCoachReducer', () => {
    test('ACTION SET_ADMIN_COACHES', () => {
        const initialState = {};
        const action = { type: 'SET_ADMIN_COACHES', payload: { coach: 'Tom' } };
        expect(adminCoachReducer(initialState, action)).toEqual({ coach: 'Tom' });
    })
    test('ACTION OTHER', () => {
        const initialState = {};
        const action = { type: 'OTHER' };
        expect(adminCoachReducer(initialState, action)).toEqual(initialState);
    })
})