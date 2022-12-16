const TasksController = require('../controllers/tasksController');
const passport = require('passport');

module.exports = (app) => {
    
    app.get('/api/tasks/findByUserAndStatus/:id_user/:status', TasksController.findByUserAndStatus);

    app.post('/api/tasks/create', TasksController.create);

}