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

const getMessagesByItem = (item_id, callback) => {
    const sql = `
        SELECT m.*, u.full_name as sender_name 
        FROM Messages m
        JOIN Users u ON m.user_id = u.user_id
        WHERE m.item_id = ? 
        ORDER BY m.created_at ASC
    `;
    db.query(sql, [item_id], callback);
};

const getConversationsByUser = (user_id, callback) => {
    const sql = `
        SELECT 
            m.item_id,
            i.item_name,
            (SELECT message_text FROM Messages 
             WHERE item_id = m.item_id 
             ORDER BY created_at DESC LIMIT 1) as last_message,
            (SELECT created_at FROM Messages 
             WHERE item_id = m.item_id 
             ORDER BY created_at DESC LIMIT 1) as last_message_time
        FROM Messages m
        JOIN Items i ON m.item_id = i.item_id
        WHERE m.user_id = ?
        GROUP BY m.item_id, i.item_name
        ORDER BY last_message_time DESC
    `;
    db.query(sql, [user_id], callback);
};

const getAdminConversations = (callback) => {
    const sql = `
        SELECT 
            m.item_id,
            i.item_name,
            u.full_name as student_name,
            (SELECT message_text FROM Messages 
             WHERE item_id = m.item_id 
             ORDER BY created_at DESC LIMIT 1) as last_message,
            (SELECT created_at FROM Messages 
             WHERE item_id = m.item_id 
             ORDER BY created_at DESC LIMIT 1) as last_message_time
        FROM Messages m
        JOIN Items i ON m.item_id = i.item_id
        JOIN Users u ON i.user_id = u.user_id
        GROUP BY m.item_id, i.item_name, u.full_name
        ORDER BY last_message_time DESC
    `;
    db.query(sql, callback);
};

module.exports = {
    createMessage,
    getMessagesByItem,
    getConversationsByUser,
    getAdminConversations
}