const classController = require('../controllers/classController');//tenemos acceso a cada uno de los metodos de classController

module.exports = (app) => {

    app.post('/api/class/create', classController.create);//api/tabla/metodo

}