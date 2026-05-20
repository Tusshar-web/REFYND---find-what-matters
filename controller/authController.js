const bcrypt = require('bcrypt');
const {validationResult , check} = require('express-validator');
const userModel = require('../models/user');
const jwt = require('jsonwebtoken');


const showSignupPage = (req,res) => {
    res.render('signup');
}

const validateSignup = [
    check('full_name').notEmpty().withMessage('Full name is required'),
    check('email').isEmail().withMessage('Valid email is required'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    check('role').isIn(['student', 'admin']).withMessage('Invalid role selected')
];

const signupUser = async (req,res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.send('Signup Failed: ' + errors.array().map(e => e.msg).join(', '));
        }

        const {full_name,email,password,role} = req.body;
        const password_hash = await bcrypt.hash(password,10);
        
        const userData = {
            full_name,
            email,
            password_hash: password_hash,
            role
    };
    userModel.createUser(
        userData, 
        (err,result)=> {
            if (err) {
                return res.send('Signup Failed: ' + err.message);
            }
            res.render('login')
        })
    } catch (error) {
        res.send('Signup Failed: ' + error.message);
    }
}

const showLoginPage = (req,res) => {
    res.render('login');
}

const validateLogin = [
    check('email').isEmail().withMessage('Valid email is required'),
    check('password').notEmpty().withMessage('Password is required')
];

const loginUser = (req,res) =>  {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.send('Login Failed: ' + errors.array().map(e => e.msg).join(', '));
    }

    const {email,password} = req.body;
    userModel.getUserByEmail(
        email, 
        async (err,result)=> {
            if(err) {
                return res.send('Databse Error')
            }
            if(result.length ===0) {
                return res.send('User not found')
            }
            const user = result[0];

            const isMatch = await bcrypt.compare(
                password,
                user.password_hash
            );

            if(!isMatch) {
                return res.send('Incorrect password')
            }
            
            const token = jwt.sign(
                {
                    id:user.user_id,
                    role: user.role
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1d'
                }
            );

             res.json({
             message :
             "Login Successful",
             token : token,
             user : {
                id : user.user_id,
                full_name : user.full_name,
                role : user.role,
                profile_image : user.profile_image
                }
               }
            );
    });
}

module.exports = {
    showLoginPage,
    loginUser,
    showSignupPage,
    signupUser,
    validateSignup,
    validateLogin
}