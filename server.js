const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const multer = require('multer');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

const users = require('./routes/userRoutes');
const tasks = require('./routes/taskRoutes');
const clase = require('./routes/classRoutes');

const port = process.env.PORT || 3000;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.disable('x-powered-by');

app.set('port', port);

const upload = multer({
    storage: multer.memoryStorage()
});

users(app, upload);
tasks(app);
clase(app);

server.listen(3000, '192.168.31.247' || 'localhost', function() {
    console.log("Servidor en NodeJS iniciado..." + port );
});

app.use(( err, req, res, next ) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});

module.exports = {
    app: app,
    server: server,
}