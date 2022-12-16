const db = require('../config/config');
const Task = {};

Task.findByUserAndStatus = (id_user, status) => {

    const sql = `
    SELECT
        T.id,
        T.id_user,
        T.name,
        T.description,
        T.delivery_date,
        T.subject,
        T.type,
        T.status
    FROM tasks as T
    WHERE T.id_user = $1 AND T.status = $2
    GROUP BY T.id
    `;

    return db.manyOrNone(sql, [id_user, status]);

}

Task.create = (task) => {

    const sql = `
    INSERT INTO tasks(
        id_user,
        name,
        description,
        delivery_date,
        subject,
        type,
        status,
        created_at,
        updated_at
    )
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id
    `;

    return db.oneOrNone(sql, [
        task.id_user,
        task.name,
        task.description,
        task.delivery_date,
        task.subject,
        task.type,
        task.status,
        new Date(),
        new Date()
    ]);

}

module.exports = Task;