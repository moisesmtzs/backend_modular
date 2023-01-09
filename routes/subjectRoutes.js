const subjectController = require('../controllers/subjectController');
const passport = require('passport');

module.exports = (app) => {

    app.post('/api/subject/create', subjectController.create);

    app.get('/api/subject/findByUser/:id_user', passport.authenticate('jwt', {session: false}), subjectController.findByUser);

    app.put('/api/subject/update', passport.authenticate('jwt', {session: false}), subjectController.update);

    app.delete('/api/subject/delete/:id', passport.authenticate('jwt', {session: false}), subjectController.delete);
    
    
    app.get('/api/subject/findByName/:name/:id', subjectController.findByName);
}