const db = require('../config/config');
const crypto = require('bcrypt');

const User = {};

User.getAll = () => {
    const sql = `
    SELECT
        *
    FROM
        users
    `;

    return db.manyOrNone(sql);
}

User.findById = (id) => {

    const sql = `
    SELECT 
        id,
        name,
        lastname,
        phone,
        email,
        password,
        image
    FROM
        users
    WHERE
        id = $1
    `;
    return db.oneOrNone(sql, id);
        
}

User.findByIdPassport = (id, callback) => {

    const sql = `
    SELECT 
        id,
        name,
        lastname,
        phone,
        email,
        password,
        image
    FROM
        users
    WHERE
        id = $1
    `;
    return db.oneOrNone(sql, id).then(user => { callback(null, user) });
        
}

User.findByEmail = (email) => {
        
    const sql = `
    SELECT 
        id, 
        name,
        lastname,
        phone,
        email,
        password,
        image
    FROM 
        users
    WHERE
        email = $1
    `;
    return db.oneOrNone(sql, email);

}

User.create = async (user) => {

    const hashedPassword = await crypto.hash(user.password, 10);

    const sql = `
    INSERT INTO 
        users(
            name,
            lastname,
            phone,
            email,
            password,
            image,
            created_at,
            updated_at
        )
    VALUES ( $1, $2, $3, $4, $5, $6, $7, $8 ) RETURNING id
    `;
    
    return db.oneOrNone(sql, [
        user.name,
        user.lastname,
        user.phone,
        user.email,
        hashedPassword,
        user.image,
        new Date(),
        new Date()
    ]);

}

User.updateWithImage = (user) => {

    const sql = `
    UPDATE
        users
    SET
        name = $2,
        lastname = $3,
        phone = $4,
        image = $5,
        updated_at = $6
    WHERE
        id = $1
    `;
    return db.none(sql, [
        user.id,
        user.name,
        user.lastname,
        user.phone,
        user.image,
        new Date()
    ]);

}

User.updateWithoutImage = (user, result) => {

    const sql = `
    UPDATE
        users
    SET
        name = $2,
        lastname = $3,
        phone = $4,
        updated_at = $5
    WHERE
        id = $1
    `;
    return db.none(sql, [
        user.id,
        user.name,
        user.lastname,
        user.phone,
        new Date()
    ]);

}

User.delete = (id) => {

    const sql = `
    DELETE FROM
        users
    WHERE
        id = $1
    `;
    return db.oneOrNone(sql, id);

}

module.exports = User;