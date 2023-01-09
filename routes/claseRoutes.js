const claseController = require('../controllers/claseController');
const passport = require('passport');

module.exports = (app) => {

    app.post('/api/clase/create', claseController.create);

    app.get('/api/clase/findByUserAndSubject/:id_subject', passport.authenticate('jwt', {session: false}), claseController.findByUserAndSubject);

    app.put('/api/clase/update', passport.authenticate('jwt', {session: false}), claseController.update);

    app.delete('/api/clase/delete/:id', passport.authenticate('jwt', {session: false}), claseController.delete);

}