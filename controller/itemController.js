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