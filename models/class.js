//Farfan
const db = require('../config/config');

const Clase = {};

Clase.create = async(clase) => {//Agregar el id del usuario
    const sql = `
    INSERT INTO 
        class(
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
        clase.id_user,
        clase.name,
        clase.subject_code,
        clase.professor_name,
        new Date(),
        new Date()
    ]);
}

module.exports = Clase;