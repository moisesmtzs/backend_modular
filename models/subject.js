//Farfan
const db = require('../config/config');

const Subject = {};

Subject.create = async(subject) => {
    const sql = `
    INSERT INTO 
        subject(
            id_user,
            name,
            subject_code,
            professor_name,
            created_at,
            updated_at
        )
    VALUES ( $1, $2, $3, $4, $5, $6 ) RETURNING id
    `;

    return db.oneOrNone(sql, [
        subject.id_user,
        subject.name,
        subject.subject_code,
        subject.professor_name,
        new Date(),
        new Date()
    ]);
}

Subject.findByName = async(name, id_user) => {
    const sql = `
    SELECT
        *
    FROM
        subject
    WHERE
        name = $1
    AND
        id_user = $2
    `;
    return db.manyOrNone(sql, [
        name,
        id_user
    ]);
}

module.exports = Subject;