const db = require('../config/config');
const Clase = {};

Clase.create = async(clase) => {
    const sql = `
    INSERT INTO 
        clase(
            id_user,
            subject,
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
        clase.subject,
        clase.begin_hour,
        clase.end_hour,
        clase.days,
        clase.classroom,
        clase.building,
        new Date(),
        new Date()
    ]);
}

Clase.findByUser = (id_user) => {
    const sql = `
    SELECT
        C.id,
        C.id_user,
        C.subject,
        C.begin_hour,
        C.end_hour,
        C.days,
        C.classroom,
        C.building
    FROM
        clase as C
    WHERE 
        C.id_user = $1 
    GROUP BY 
        C.id`;

    return db.manyOrNone(sql, [id_user]);
}

Clase.findByUserAndSubject = (id_user, subject) => {
    const sql = `
    SELECT
        C.id,
        C.id_user,
        C.subject,
        C.begin_hour,
        C.end_hour,
        C.days,
        C.classroom,
        C.building
    FROM clase as C
    WHERE C.id_user = $1 AND C.subject = $2
    GROUP BY C.id
    `;

    return db.manyOrNone(sql, [id_user, subject]);
}


Clase.findByUserAndDay = (id_user, day) => {
    const sql = `
    SELECT
        C.begin_hour,
        C.end_hour
    FROM clase as C
    WHERE C.id_user = $1 AND C.days = $2
    GROUP BY C.id
    `;
    return db.manyOrNone(sql, [id_user, day]);
}

Clase.findById = (begin_hour, end_hour, days, id_user) => {
    const sql = `
    SELECT
        C.id,
        C.id_user,
        C.subject,
        C.begin_hour,
        C.end_hour,
        C.days,
        C.classroom,
        C.building
    FROM 
        clase as C
    WHERE 
        C.begin_hour = $1 AND C.end_hour = $2 AND C.days = $3 AND C.id_user = $4
    GROUP BY C.id
    `;

    return db.manyOrNone(sql, [begin_hour, end_hour, days, id_user]);
}

Clase.findByIdDayBegine = (id_user, days, begin_hour) => {
    const sql = `
    SELECT
        C.id,
        C.id_user,
        C.subject,
        C.begin_hour,
        C.end_hour,
        C.days,
        C.classroom,
        C.building
    FROM 
        clase as C
    WHERE 
        C.id_user = $1 AND C.begin_hour = $2 AND C.days = $3 
    GROUP BY C.id
    `;

    return db.oneOrNone(sql, [id_user, begin_hour, days]);
}


Clase.update = (clase) =>{
    const sql = `
    UPDATE
        clase
    SET
        begin_hour = $2,
        end_hour = $3,
        days = $4,
        classroom = $5,
        building = $6,
        updated_at = $7
    WHERE
        id = $1`;

    return db.none(sql, [
        clase.id,
        clase.begin_hour,
        clase.end_hour,
        clase.days,
        clase.classroom,
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

Clase.getDates = (id) => {
    const sql = `
    SELECT
        created_at,
        updated_at
    FROM
        clase
    WHERE 
        id = $1
    `;
    return db.oneOrNone(sql, id);

}

module.exports = Clase;