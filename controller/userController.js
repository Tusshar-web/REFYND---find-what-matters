const userModel = require('../models/user');

exports.getProfile = (req,res)=> {
    const user_id = req.user.id;
    userModel.getUserById(
        user_id,
        (err, result) => {
            if(err){
                return res.status(500).json({
                    message : "Database Error"
                })
            }
            if(result.length === 0) {
                return res.status(404).json({
                    message : "User not found"
                })
            }
            res.json({
                user:result[0]
            })
        }
    )
}