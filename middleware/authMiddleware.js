const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: "No token provided"
        });
    }

    const token = authHeader.split(' ')[1]; // ✅ extract token after "Bearer "

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