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

    test('user route should return user if logged in', async () => {
        const agent = testServer.agent(app);
        const loginResponse = await agent.post('/api/user/login')
                              .send({username: 'ted@gmail.com', password: '1234'});
        expect(loginResponse.statusCode).toBe(200);

        const userResponse = await agent.get('/api/user/');
        expect(userResponse.statusCode).toBe(200);
    })
})