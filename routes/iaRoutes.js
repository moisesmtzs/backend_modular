const iaController = require('../controllers/iaController');
const passport = require('passport');

module.exports = (app) => {

    app.get('/api/ia/getAll', iaController.getAll);
    app.get('/api/ia/findByWord/:word', iaController.finByWord);
}