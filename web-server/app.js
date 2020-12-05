const morgan = require('morgan');
const express = require('express');
const app = express();

app.use(morgan('combined'));

app.get('/', (req, res) => {
    res.send("This endpoint is valid and returns a successful 200 server response as well as this message encoded in text/html");
});

app.get('/service-unavailable', (req, res) => {
    res.status(503).send("This endpoint sends out a 503 service unavailable error. When accessing this endpoint directly, it should return an error 503 server response as well as this message encoded in text/html");
});

app.listen(process.env.PORT || 80, () => {
    console.log(`Web server listening`);
});

let calledClose = false;

process.on('exit', function () {
    if (calledClose) return;
    console.log('Got exit event. Trying to stop Express server.');
    server.close(function () {
        console.log("Express server closed");
    });
});

process.on('SIGINT', function () {
    console.log('Got SIGINT. Trying to exit gracefully.');
    calledClose = true;
    server.close(function () {
        console.log("Express server closed. Asking process to exit.");
        process.exit()
    });
});