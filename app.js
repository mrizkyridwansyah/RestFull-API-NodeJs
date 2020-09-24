const http = require('http');
const express = require('express');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const app = express();

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(morgan('dev'));

let routes = require('./routes');
routes(app);

app.use('/auth', require('./middleware'));

app.listen(3000, () => { console.log('running') });