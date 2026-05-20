const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    let token;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1]; // ✅ extract token after "Bearer "
    } else if (req.query.token) {
        token = req.query.token;
    }
    console.log(req.headers.authorization);
    if (!token) {
        return res.status(401).json({
            message: "No token provided"
        });
    }

    try {
        const verified = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({
            message: "Invalid token"
        });
    }
}