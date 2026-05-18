const db = require('../utils/db');

const createUser = (data,callback)=> {
    const sql = `
    INSERT INTO Users(
    full_name,
    email,
    password_hash,
    role
    )
    VALUES(?,?,?,?)`;

    db.query(
        sql,
        [
            data.full_name,
            data.email,
            data.password_hash,
            data.role
        ],
        callback
    );
};

const getUserByEmail = (email,callback)=> {
    const sql = `SELECT * FROM Users WHERE email = ?`;
    db.query(
        sql,
        [email],
        callback
    );
};

module.exports = {
    createUser,
    getUserByEmail
}



