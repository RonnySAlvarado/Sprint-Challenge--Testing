const express = require('express');

const server = express();

const Games = require('./games/gamesModel');

server.use(express.json());

server.get('/games', async (req, res) => {
    try {
        const allGames = await Games.getAll();
        if(allGames){
            res.status(200).json(allGames);
        } else {
            res.status(400).json({ message: "Not able to get list of games." })
        }
    } catch (err) {
        res.status(500).json({ message: "Something went wrong with your request." })
    }
})

server.post('/games', validBody, async (req, res) => {
    try {
        const addedGame = await Games.insert(req.body);
        res.status(201).json(addedGame);
    } catch(err) {
        res.status(500).json({ message: "Something went wrong with the request." })
    }
})

function validBody (req, res, next) {
    if (!req.body.title || !req.body.genre){
        res.status(422).json({ message: "Incomplete form. Please enter a title and genre" })
    } else {
        next();
    }
}

module.exports = server;