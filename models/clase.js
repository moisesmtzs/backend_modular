//Farfan
const db = require('../config/config');

const Clase = {};

Clase.create = async(clase) => {
    const sql = `
    INSERT INTO 
        clase(
            id_subject,
            begin_hour,
            end_hour,
            days,
            classroom,
            building,
            created_at,
            updated_at
        )
    VALUES ( $1, $2, $3, $4, $5, $6, $7, $8 ) RETURNING id
    `;

    return db.oneOrNone(sql, [
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

module.exports = Clase;