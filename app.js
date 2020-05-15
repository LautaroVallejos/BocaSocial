const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(require('./controllers/admin.crtl'));
app.use(require('./controllers/auth.crtl'));
app.use(require('./controllers/geo.crtl'));
//app.use(require('./controllers/group.crtl'));
app.use(require('./controllers/pay.crtl'));
app.use(require('./controllers/points.ctrl'));
//app.use(require('./controllers/'));

module.exports = app;