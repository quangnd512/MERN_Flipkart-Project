const jwt = require('jsonwebtoken');

exports.requireSignin = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;   
    }else {
        return res.status(400).json({ message: 'Authorization required' });
    }
    next();
}

// Nếu request là user thì chuyển hướng
exports.userMiddleware = (req, res, next) => {
    if (req.user.role !== 'user') {
        return res.status(400).json({ message: 'User access denied' })
    }
    next();
}

// Nếu request là admin thì chuyển hướng
exports.adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(400).json({ message: 'Admin access denied' })
    }
    next();
}