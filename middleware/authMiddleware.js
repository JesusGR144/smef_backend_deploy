import jwt from 'jsonwebtoken';
import Instructor from '../models/Instructor.js';

const checkAuth = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.instructor = await Instructor.findById(decoded.id).select("-password -token -confirmado -__v");

            return next();
        } catch (error) {
            const e = new Error("Token no válido");
            return res.status(403).json({ msg: e.message });
        }
    }

    if (!token) {
        const error = new Error("Token no válido");
        return res.status(403).json({ msg: error.message });
    }

    next();
}

export default checkAuth;