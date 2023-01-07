const claseController = require('../controllers/claseController');//tenemos acceso a cada uno de los metodos de classController

module.exports = (app) => {

    app.post('/api/clase/create', claseController.create);//api/tabla/metodo

}