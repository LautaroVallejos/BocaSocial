const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(require('./controllers/auth.crtl'));
app.use(require('./controllers/points.ctrl'));
module.exports = app;