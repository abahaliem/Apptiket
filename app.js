const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const notFoundMiddleware = require('./app/middlewares/not-found');
const handleErrorMiddleware = require('./app/middlewares/handler-error');

const app = express();

//router
const categoriesRouter = require('./app/api/v1/categories/router');
const imageRouter = require('./app/api/v1/Images/router')
const talentRouter = require('./app/api/v1/talents/router')
const eventRouter = require('./app/api/v1/Events/router');

const v1 = '/api/v1/cms';

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req, res)=> {
    res.status(200).json({
        message: 'Welcome to api SEMINA',
    })
})

app.use(v1, categoriesRouter)
app.use(v1, imageRouter);
app.use(v1, talentRouter);
app.use(v1, eventRouter);


//// middlewares
app.use(notFoundMiddleware);
app.use(handleErrorMiddleware);


module.exports = app;
