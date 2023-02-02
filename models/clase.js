const db = require('../config/config');
const Clase = {};

Clase.create = async(clase) => {
    const sql = `
    INSERT INTO 
        clase(
            id_user,
            id_subject,
            begin_hour,
            end_hour,
            days,
            classroom,
            building,
            created_at,
            updated_at
        )
    VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9 ) RETURNING id
    `;

    return db.oneOrNone(sql, [
        clase.id_user,
        clase.id_subject,
        clase.begin_hour,
        clase.end_hour,
        clase.days,
        clase.classroom,
        clase.building,
        new Date(),
        new Date()
    ]);
}

Clase.findByUserAndSubject = (id_user, id_subject) => {
    const sql = `
    SELECT
        C.id,
        C.id_subject,
        C.begin_hour,
        C.end_hour,
        C.days,
        C.classroom,
        C.building
    FROM clase as C
    WHERE C.id_user = $1 AND C.id_subject = $1
    GROUP BY C.id
    `;

    return db.manyOrNone(sql, [id_user, id_subject]);
}

Clase.update = (clase) => {
    console.log("Entro");
    const sql = `
    UPDATE
        clase
    SET
        begin_hour = $3,
        end_hour = $4,
        days = $5,
        clasroom = $6,
        building = $7
        updated_at = $9
    WHERE
        id = $1`;
        console.log("salio");
    return db.none(sql, [
        clase.id,
        clase.begin_hour,
        clase.end_hour,
        clase.days,
        clase.clasroom,
        clase.building,
        new Date(),
    ]);
}

Clase.delete = (id) => {
    const sql = `
    DELETE FROM
        clase
    WHERE
        id = $1
    `;
    
    return db.oneOrNone(sql, id);
}

module.exports = Clase;