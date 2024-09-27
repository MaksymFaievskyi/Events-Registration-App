const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

app.use(express.json());
app.use(cors())

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


const eventsRouter = require('./routes/eventRouter');
app.use('/events', eventsRouter);

module.exports = app;