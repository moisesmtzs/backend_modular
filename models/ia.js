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

ia.getByCommand = (command) => {
    const sql = `
    SELECT
        *
    FROM
        ia_task
    WHERE
        command = $1
    `;
    return db.manyOrNone(sql, [
        command
    ]);
}

ia.create = (ia_task) => {

    const sql = `
    INSERT INTO IA_TASK
    (   
        command, 
        type, 
        obj, 
        created_at, 
        updated_at
    )
    VALUES($1, $2, $3, $4, $5) RETURNING id
    `;

    return db.oneOrNone(sql, [
        ia_task.command,
        ia_task.type,
        ia_task.obj,
        new Date(),
        new Date()
    ]);

}

module.exports = ia;