const request = require('supertest');
const server = require('./server');
const db = require('./data/dbConfig');

describe('GET /games', () => {

    beforeEach( async () => {
        await db('games').truncate();
    })

    it('should return 200', async () => {
        const res = await request(server).get('/games'); 
        expect(res.status).toBe(200); 
        expect(res.type).toBe('application/json'); 
    })
})