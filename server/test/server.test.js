const app = require('../server');
const testServer = require('supertest');

describe('Testing user routes', () => {
    
    test('Logout route should always respond with status 200', async () => {
        const response = await testServer(app).post('/api/user/logout');
        expect(response.statusCode).toBe(200);
    })

    test('user route should be protected - must be logged in', async () => {
        const response = await testServer(app).get('/api/user/');
        expect(response.statusCode).toBe(403);
    })

    // test('user route should return user if logged in', async () => {
    //     const agent = testServer.agent(app);
    //     const loginResponse = await agent.post('/api/user/login')
    //                           .send({username: 'ted@gmail.com', password: '1234'});
    //     expect(loginResponse.statusCode).toBe(200);

    //     const userResponse = await agent.get('/api/user/');
    //     expect(userResponse.statusCode).toBe(200);
    // })

    test('get route for admin client view should return client list from db', async () => {
        const agent = testServer.agent(app);
        const response = await agent.get('/api/admin/client');
        expect(response.statusCode).toBe(200);
    })

    test('get route for admin coach view should return coach list from db', async () => {
        const agent = testServer.agent(app);
        const response = await agent.get('/api/admin/coach');
        expect(response.statusCode).toBe(200);
    })

    test('get route for admin payout view, should return coaches and payouts', async () => {
        const agent = testServer.agent(app);
        const response = await agent.get('/api/admin/payment');
        expect(response.statusCode).toBe(200);
    })
})