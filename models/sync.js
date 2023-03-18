const db = require('../config/config');
const Sync = {};

Sync.executeSync = (command) => {

    return db.manyOrNone(command);

} 

module.exports = Sync;