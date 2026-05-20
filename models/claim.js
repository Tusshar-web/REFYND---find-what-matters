const db = require('../utils/db');

const createClaim = (data,callback)=> {
    const sql = `
    INSERT INTO Claims(
        item_id,
        claimant_id,
        proof_description,
        claim_status,
        identifying_feature
    )
    VALUES(?,?,?,?,?)
    `;
    
    db.query(
        sql,
        [
            data.item_id,
            data.claimant_id,
            data.proof_description,
            'pending',
            data.identifying_feature
        ], 
        callback
    )
}

const getAllClaims = (callback)=> {
    const sql = `SELECT * FROM Claims`;
    db.query(sql, callback);
}


const getClaimsByUser = (user_id, callback) => {
    const sql = `SELECT * FROM Claims WHERE claimant_id = ?`;
    db.query(sql, [user_id], callback);
}

const getItemsByUser = (
    user_id,
    callback
) => {

    const sql = `

    SELECT *

    FROM Items

    WHERE user_id = ?
    `;

    db.query(

        sql,

        [user_id],

        callback
    );
};

module.exports = { createClaim, getAllClaims, getClaimsByUser };

