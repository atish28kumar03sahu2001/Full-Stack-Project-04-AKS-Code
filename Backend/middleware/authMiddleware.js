//backend/middleware/authMiddleware.js
export const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return next();
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token. Please sign in.' });
        }
        
        req.userId = decoded.id;
        return res.status(403).json({ message: 'User already logged in. Redirecting to profile.' });
    });
};