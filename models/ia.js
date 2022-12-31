const db = require('../config/config');
const ia = {};

ia.getAll = () => {
    const sql = `
    SELECT
        *
    FROM
        ia_task
    `;
    return db.manyOrNone(sql);
}

ia.getByWord = (word) => {
    const sql = `
    SELECT
        *
    FROM
        ia_task
    WHERE
        word = $1
    `;
    return db.manyOrNone(sql, [
        word
    ]);
}

module.exports = ia;