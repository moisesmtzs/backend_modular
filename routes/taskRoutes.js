const TasksController = require('../controllers/tasksController');
const passport = require('passport');

module.exports = (app) => {
    
    app.get('/api/tasks/findByUserAndStatus/:id_user/:status', TasksController.findByUserAndStatus);

    app.post('/api/tasks/create', TasksController.create);

    app.put('/api/tasks/update', TasksController.update);
    app.put('/api/tasks/updateStatus/:id/:status', TasksController.updateStatus);

    app.delete('/api/tasks/delete/:id', TasksController.delete);

}