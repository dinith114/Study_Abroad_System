const express = require('express');
const { processMessage } = require('../controllers/ChatController');

const router = express.Router();

const chatRoutes = (io) => {
    console.log("io",io)
    io.on('connection', (socket) => {
        console.log('A user connected');

        socket.on('message', (msg) => {
            console.log('Message received: ', msg);
            const reply = processMessage(msg);
            socket.emit('reply', reply);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });

    // Other HTTP routes (if needed) can be defined here
    router.get('/', (req, res) => {
        res.send('Chatbot backend is running');
    });

    return router;
};

module.exports = chatRoutes;
