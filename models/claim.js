const db = require('../utils/db');

const createClaim = (data,callback)=> {
    const sql = `
    INSERT INTO Claims(
        item_id,
        claimant_id,
        proof_description,
        claim_status
    )
    VALUES(?,?,?,?)
    `;
    
    db.query(
        sql,
        [
            data.item_id,
            data.claimant_id,
            data.proof_description,
            'pending'
        ], 
        callback
    )
}

module.exports = {
    createClaim
};