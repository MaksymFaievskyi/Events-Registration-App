const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
//const errorHandler = require('./middleware/errorHandler')


app.use(express.json());
app.use(cors())

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


const eventsRouter = require('./routes/eventRouter');
app.use('/events', eventsRouter);

//app.use(errorHandler);

module.exports = app;