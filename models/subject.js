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

Subject.findByUser = (id_user) => {
    const sql = `
    SELECT
        S.id,
        S.id_user,
        S.name,
        S.subject_code,
        S.professor_name
    FROM 
        subject as S
    WHERE 
        S.id_user = $1 
    GROUP BY 
        S.id`;

    return db.manyOrNone(sql, [id_user]);
}


Subject.update = (subject) => {
    console.log(subject);
    const sql = `
    UPDATE
        subject
    SET
        name = $2,
        subject_code = $3,
        professor_name = $4,
        updated_at = $5
    WHERE
        id = $1`;

    return db.none(sql, [
        subject.id,
        subject.name,
        subject.subject_code,
        subject.professor_name,
        new Date(),
    ]);
}

Subject.delete = (id) => {
    const sql = `
    DELETE FROM
        subject
    WHERE
        id = $1`;

    return db.oneOrNone(sql, id);
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
        id_user = $2`;

    return db.manyOrNone(sql, [
        name,
        id_user
    ]);
}

Subject.findByNameIA = async(name, id_user) => {
    const sql = `
    SELECT
        *
    FROM
        subject
    WHERE
        name = $1
    AND
        id_user = $2`;

    return db.manyOrNone(sql, [
        name,
        id_user
    ]);
}

Subject.getDates = (id) => {

    const sql = `
    SELECT
        created_at,
        updated_at
    FROM
        subject
    WHERE 
        id = $1
    `;
    return db.oneOrNone(sql, id);

}

module.exports = Subject;