const subjectController = require('../controllers/subjectController');//tenemos acceso a cada uno de los metodos de classController

module.exports = (app) => {

    app.post('/api/subject/create', subjectController.create);//api/tabla/metodo
    app.get('/api/subject/findByName/:name/:id', subjectController.findByName);
}