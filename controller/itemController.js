const itemModel = require('../models/item');


exports.addItem = (req,res)=> {
        const {
            item_name,
            item_type,
            category,
            description            
        } = req.body;

        const image_url = req.file.filename;

        const user_id = req.user.id;

        const itemData = {
            user_id,
            item_name,
            item_type,
            category,
            description,
            image_url
        };

        itemModel.addItem(
            itemData,
            (err,result)=> {

                if(err) {
                    console.log(err);
                }

                res.json ({
                    message : "Item added successfully",
                    item : result
                })
            }
        )
    }


exports.getAllItems = (req,res)=> {
    itemModel.getAllItems(
        (err,result)=> {
            
            if(err){
                return res.status(500).json({
                    message : "Database Error"
                })
            }

            res.json({
                items : result
            })
            }
    )
}

exports.getItem = (req,res)=> {
    const id = req.params.id;
    itemModel.getItemById(
        id,
        (err,result)=> {
            if(err) {
                return res.status(500).json({
                    message : "Database Error"
                })
            }
            res.json(result[0])
        })
}

exports.searchItem = (req,res)=> {
    const keyword = req.query.keyword;
    itemModel.searchItem(
        keyword,
        (err,result)=> {
            if(err) {
                return res.status(500).json({
                    message : "Database Error"
                })
            }
            res.json({ items: result })
        })
}

exports.getMyItems = (
    req,
    res
) => {

    const user_id =
    req.user.id;

    itemModel.getItemsByUser(

        user_id,

        (err, result) => {

            if (err) {

                return res
                .status(500)
                .json({

                    message:
                    'Database Error'
                });
            }

            res.json(result);
        }
    );
};

exports.showEditPage = (req,res)=> {
    const item_id = req.params.id;
    itemModel.getItemById(
        item_id,
        (err,result)=> {
            if(err) {
                return res.status(500).json({
                    message : "Database Error"
                })
            }
        if(
            result.length === 0
        ) {
            return res.status(404).json({
                message : "Item not found"
            })
        }

        const item = result[0];

        //security check 
        if(item.user_id !== req.user.id) {
            return res.status(403).json({
                message : "unauthorized"
        }
         )
            }

        res.render('edit-item', {item : item})
        }
    )
}

exports.updateItem = (req,res)=> {
    const item_id = req.params.id;
    const {
        item_name,
        category,
        description
    } = req.body;
    let image_url = null;
    if (req.file) {
        image_url = req.file.filename;
    }

    itemModel.getItemById(
        item_id,
        (err,result) => {
            if(result.length === 0) {
                return res.status(404).json({
                    message : "Item not found"
                })
            }

        const item = result[0];

        //security check
        if(item.user_id !== req.user.id) {
            return res.status(403).json({
                message : "Unauthorized"
            })
        }

        const updateData = {
            item_name,
            category,
            description,
            image_url
        }

        itemModel.updateItem(
            item_id,
            updateData,
            (err,result)=> {
                if(err) {
                    return res.status(500).json({
                        message : "Database Error"
                    })
                }
                res.json({
                    message : "Item updated successfully",
                    item : result
                })
            }
        )   
        }
    )  
}

exports.deleteItem = (req,res)=> {
    const item_id = req.params.id;
    itemModel.getItemById(
        item_id,
        (err,result)=> {
            if(result.length === 0) {
                return res.status(404).json({
                    message : "Item not found"
                })
            }
            const item = result[0];

            //security check
            if(item.user_id !== req.user.id) {
                return res.status(403).json({
                    message : "Unauthorized"
                })
            }
            itemModel.deleteItem(
                item_id,
                (err,result)=> {
                    if(err) {
                        return res.status(500).json({
                            message : "Database Error"
                        })
                    }
                    res.json({
                        message : "Item deleted successfully"
                    })
                }
            )
        }
    )
}