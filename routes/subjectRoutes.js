const subjectController = require('../controllers/subjectController');
const passport = require('passport');

module.exports = (app) => {

    app.post('/api/subject/create', subjectController.create);

    app.get('/api/subject/findById/:id', passport.authenticate('jwt', {session: false}), subjectController.getNameById);

    app.get('/api/subject/findByUser/:id_user', passport.authenticate('jwt', {session: false}), subjectController.findByUser);

    app.get('/api/subject/findDates/:id', passport.authenticate('jwt', {session: false}), subjectController.getDates);

    app.put('/api/subject/update', passport.authenticate('jwt', {session: false}), subjectController.update);

    app.delete('/api/subject/delete/:id', passport.authenticate('jwt', {session: false}), subjectController.delete);
    
    app.get('/api/subject/findByName/:name/:id', subjectController.findByName);

    app.get('/api/subject/findByNameIA/:name/:id', subjectController.findByNameIA);
}