const SyncController = require('../controllers/syncController');
const passport = require('passport');

module.exports = (app) => {
    app.post('/api/sync/execute', passport.authenticate('jwt', {session: false}), SyncController.executeCommand);

}