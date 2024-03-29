
const TasksController = require('../controllers/tasksController');
const passport = require('passport');

module.exports = (app) => {
    
    app.get('/api/tasks/findByUserAndStatus/:id_user/:status', passport.authenticate('jwt', {session: false}), TasksController.findByUserAndStatus);
    app.get('/api/tasks/findByUserAndName/:id_user/:name', passport.authenticate('jwt', {session: false}), TasksController.findByUserAndName);

    app.get('/api/tasks/findDates/:id', passport.authenticate('jwt', {session: false}), TasksController.getDates);

    app.post('/api/tasks/create', passport.authenticate('jwt', {session: false}), TasksController.create);

    app.put('/api/tasks/update', passport.authenticate('jwt', {session: false}), TasksController.update);
    app.put('/api/tasks/updateStatus/:id/:status', passport.authenticate('jwt', {session: false}), TasksController.updateStatus);

    app.delete('/api/tasks/delete/:id', passport.authenticate('jwt', {session: false}), TasksController.delete);

}