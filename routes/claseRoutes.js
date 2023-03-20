const claseController = require('../controllers/claseController');
const passport = require('passport');

module.exports = (app) => {

    app.post('/api/clase/create', claseController.create);
    //hora de inicio, hora de fin y dia

    app.get('/api/subject/findIdClase/:begin/:end/:days/:id_user', passport.authenticate('jwt', {session: false}), claseController.findIdClase);

    app.get('/api/clase/findByUser/:id_user', passport.authenticate('jwt', {session: false}), claseController.findByUser);

    app.get('/api/clase/findByUserAndSubject/:id_user/:id_subject', passport.authenticate('jwt', {session: false}), claseController.findByUserAndSubject);

    app.get('/api/clase/findByUserAndDay/:id_user/:day', passport.authenticate('jwt', {session: false}), claseController.findByUserAndDay);

    app.get('/api/clase/findDates/:id', passport.authenticate('jwt', {session: false}), claseController.getDates);
    
    app.put('/api/clase/update', passport.authenticate('jwt', {session: false}), claseController.update);

    app.delete('/api/clase/delete/:id', passport.authenticate('jwt', {session: false}), claseController.delete);

}