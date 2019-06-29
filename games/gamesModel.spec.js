const db = require('../data/dbConfig');

const Games = require('./gamesModel');

describe('The games model', () => {

    describe('the getAll method', () => {
        beforeEach( async () => {
            await db('games').truncate();
        })

        it('it should get all games in the database', async () => {
            const allGames = await Games.getAll();
            expect(allGames).toEqual([]);
        })
    })

    describe('the insert method', () => {

        beforeEach( async () => {
            await db('games').truncate();
        })

        it('should insert a game into the database', async () => {
            await Games.insert({ 
                title: "Title1",
                genre: "Genre1",
                releaseYear: 2000
            })

            await Games.insert({ 
                title: "Title2",
                genre: "Genre2",
                releaseYear: 2001
            })

            await Games.insert({ 
                title: "Title3",
                genre: "Genre3"
            })

            const allGames = await db('games');

            expect(allGames)
            expect(allGames).toHaveLength(3);
            expect(allGames[0].title).toBe('Title1');
            expect(allGames[1].genre).toBe('Genre2');
            expect(allGames[2].releaseYear).toBe(null);
        })
    })
})