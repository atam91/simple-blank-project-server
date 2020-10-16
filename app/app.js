var createError = require('http-errors');
var express = require('express');
const helmet = require('helmet');
var path = require('path');
var morgan = require('morgan');
const cors = require('cors');

var logger = require("./utils/logger");
var appRouter = require('./routes');

var app = express();


app.use(helmet());
app.use(morgan('dev', { "stream": logger.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: '*',     /// fixme maybe
    allowedHeaders: [ 'Content-Type', 'Authorization' ]
}));

app.use('/', appRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    logger.error(err);
    logger.error(err.toString());       /// for db errors

    if (req.app.get('env') === 'development') {
        res.status(err.status || 500);
        res.send({
            error: err.humanMessage || err.message
        });
    } else {
        res.sendStatus(err.status || 500);
    }
});

module.exports = app;