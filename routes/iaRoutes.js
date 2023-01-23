const iaController = require('../controllers/iaController');
const passport = require('passport');

module.exports = (app) => {

    app.get('/api/ia/getAll', iaController.getAll);
    app.get('/api/ia/findByCommand/:command', iaController.findByCommand);
    app.post('/api/ia/create', passport.authenticate('jwt', {session: false}), iaController.create);
}