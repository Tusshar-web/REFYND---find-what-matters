const db = require('../utils/db')

const addItem = (data, callback)=> {
    const sql = `
    INSERT INTO Items(
        user_id,
        item_name,
        item_type,
        category,
        description,
        image_url
    )
    VALUES(?,?,?,?,?,?)
    `;

    db.query(sql,
        [
            data.user_id,
            data.item_name,
            data.item_type,
            data.category,
            data.description,
            data.image_url
        ],
        callback
    );
};

const getAllItems = (callback)=> {
    const sql = `SELECT * FROM Items`;
    db.query(sql, callback);
};

const getItemById = (id, callback)=> {
    const sql = `SELECT * FROM Items WHERE item_id = ?`;
    db.query(sql, [id], callback);
}; 

const searchItem =(keyword,callback)=> {
    const sql = `SELECT * FROM Items WHERE item_name LIKE ?`;
    db.query(sql, [`%${keyword}%`], callback);
}

const getItemsByUser = (user_id,callback) => {
    const sql = `SELECT * FROM Items WHERE user_id = ?`;
    db.query(sql,[user_id],callback);
};

const updateItem =(item_id, data , callback) => {
    if (data.image_url) {
        const sql = `UPDATE Items SET item_name = ?, category = ?, description = ?, image_url = ? WHERE item_id = ?`;
        db.query(sql,
            [
                data.item_name,
                data.category,
                data.description,
                data.image_url,
                item_id
            ],
            callback
        );
    } else {
        const sql = `UPDATE Items SET item_name = ?, category = ?, description = ? WHERE item_id = ?`;
        db.query(sql,
            [
                data.item_name,
                data.category,
                data.description,
                item_id
            ],
            callback
        );
    }
};

const deleteItem = (item_id, callback) => {
    const sql = `DELETE FROM Items WHERE item_id = ?`;
    db.query(sql, [item_id], callback);
}

module.exports = {
    addItem,
    getAllItems,
    getItemById,
    searchItem,
    getItemsByUser,
    updateItem,
    deleteItem
}