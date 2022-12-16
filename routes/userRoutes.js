const userController = require('../controllers/userController');
const passport = require('passport');

module.exports = (app, upload) => {

    app.get('/api/users/getAll', userController.getAll);
    app.get('/api/users/findById/:id', userController.findById);

    app.post('/api/users/register', userController.register);
    app.post('/api/users/login', userController.login);

    app.put('/api/users/update', upload.array('image', 1), userController.updateWithImage);
    app.put('/api/users/updateWithoutImage', userController.updateWithoutImage);

    app.delete('/api/users/delete/:id', userController.delete);

}