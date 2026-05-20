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

exports.updateProfile = (req, res) => {
    const user_id = req.user.id;
    const { phone_number, department, student_id } = req.body;
    let profile_image = null;

    if (req.file) {
        profile_image = req.file.filename;
    }

    const data = {
        phone_number: phone_number || null,
        department: department || null,
        student_id: student_id || null,
        profile_image: profile_image
    };

    userModel.updateUserProfile(user_id, data, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to update profile" });
        }
        res.json({ message: "Profile updated successfully!" });
    });
}