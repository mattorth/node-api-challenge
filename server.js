// import express
const express = require('express');

// create server
const server = express();
const port = process.env.PORT || 5000;

// import middleware
const helmet = require('helmet');
const morgan = require('morgan');

// global middleware
server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
server.use(cors);

// routers
const actionRouter = require('./routers/actionRouter');

// bind routers
server.use('/actions', actionRouter);

server.use('/', (req, res) => {
    res.send(`<h1>Node API Challenge</h1>`);
})


// listen
server.listen(port, () => {
    console.log(`*** Server listening on port ${port} ***`);
})

module.exports = server;