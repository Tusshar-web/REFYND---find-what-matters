const db = require('../utils/db');

const createMessage = (messsageData,callback) => {
    const sql = `INSERT INTO Messages(
        user_id,
        item_id,
        message_text,
        sender_role
    )
        VALUES(?,?,?,?)`;
    db.query(
        sql,
        [
            messsageData.user_id,
            messsageData.item_id,
            messsageData.message_text,
            messsageData.sender_role
        ],
        callback
    );
};

const getMessgaesByItem = (item_id,callback) => {
    const sql = `SELECT * FROM Messages WHERE item_id = ? ORDER BY created_at DESC`;
    db.query(
        sql,
        [item_id],
        callback
    )
}

const getConversationsByUser = (user_id, callback) => {
    const sql = `
        SELECT 
            m.item_id,
            i.item_name,
            (SELECT message_text FROM Messages 
             WHERE item_id = m.item_id 
             ORDER BY created_at DESC LIMIT 1) as last_message
        FROM Messages m
        JOIN items i ON m.item_id = i.item_id
        WHERE m.user_id = ?
        GROUP BY m.item_id, i.item_name
    `;
    db.query(sql, [user_id], callback);
};

module.exports = {
    createMessage,
    getMessgaesByItem,
    getConversationsByUser
}