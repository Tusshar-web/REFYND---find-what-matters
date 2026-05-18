const claimModel = require('../models/claim');

const submitClaim = (req,res)=> {
    const {
        item_id,
        proof_description,
        identifying_feature
    } = req.body;

    const claimant_id = req.user.id;

    const claimData = {
        item_id,
        claimant_id,
        proof_description,
        identifying_feature ,
        claim_status : 'pending'
    };

    claimModel.createClaim(
        claimData,
        (err,result)=> {
            if(err) {
                return res.status(500).json({
                    message : "Database Error"
                })
            }
            res.json({
                message : "Claim submitted successfully",
                claim : result
            })
        }
    )
    
}

const getAllClaims = (req,res) => {
    claimModel.getAllClaims((err,result)=> {
        if (err) {
            return res.status(500).json({
                message : "Database Error",
                error:err.message
            })
        }
        res.json({
            claims : result
        })
    })
}

const getUserClaims = (req, res) => {
    const user_id = req.user.id; // from verifyToken

    claimModel.getClaimsByUser(user_id, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database Error', error: err.message });
        }
        res.json({ claims: result });
    });
}

module.exports = { submitClaim, getAllClaims, getUserClaims };

