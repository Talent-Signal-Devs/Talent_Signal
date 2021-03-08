import adminClientReducer from './adminClient.reducer';

describe('ACTION SET_ADMIN_CLIENTS', () => {

    test('ACTION SET_ADMIN_CLIENTS', () => {
        const initialState = {};
        const action = { type: 'SET_ADMIN_CLIENTS', payload: { client: 'Jeff' } };
        expect(adminClientReducer(initialState, action)).toEqual({ client: 'Jeff' });
    })

    test('ACTION OTHER', () => {
        const initialState = {};
        const action = { type: 'OTHER' };
        expect(adminClientReducer(initialState, action)).toEqual(initialState);
    })
})