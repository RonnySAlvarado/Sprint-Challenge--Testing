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

describe('POST /games', () => {
    beforeEach( async () => {
        await db('games').truncate();
    })

    it('should return status 201', async () => {
        const game = {
            title: "Pacman",
            genre: "Arcade",
            releaseYear: 1980
        }
        const res = await request(server).post('/games').send(game);
        expect(res.status).toBe(201);
        expect(res.type).toBe('application/json'); 
    })

    it('should return status 422', async () => {
        const incompleteGame = {
            title: "Pacman",
            genre: "",
            releaseYear: 1980
        }
        const res = await request(server).post('/games').send(incompleteGame);
        expect(res.status).toBe(422);
    })
})