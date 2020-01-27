// import express
const express = require('express');

// create server
const server = express();

// import middleware
const helmet = require('helmet');
const morgan = require('morgan');
// const cors = require('cors');

// global middleware
server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
// server.use(cors);

// routers
const actionRouter = require('./routers/actionRouter');
const projectRouter = require('./routers/projectRouter');

// bind routers
server.use('/actions', actionRouter);
server.use('/projects', projectRouter);

server.use('/', (req, res) => {
    res.send(`<h1>Node API Challenge</h1>`);
})

module.exports = server;