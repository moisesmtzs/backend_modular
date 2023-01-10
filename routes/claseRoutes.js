const ClaseController = require('../controllers/claseController');
const passport = require('passport');

module.exports = (app) => {

    app.post('/api/clase/create', ClaseController.create);

    app.get('/api/clase/findByUserAndSubject/id_user/:id_subject', passport.authenticate('jwt', {session: false}), ClaseController.findByUserAndSubject);

    app.put('/api/clase/update', passport.authenticate('jwt', {session: false}), ClaseController.update);

    app.delete('/api/clase/delete/:id', passport.authenticate('jwt', {session: false}), ClaseController.delete);

}