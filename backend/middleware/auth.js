import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {

    const auth = req.headers.authorization;

    if (!auth || !auth.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: "Not Authorised" });
    }

    const token = auth.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = { id: decoded.id };

        next();
    }

     catch (error) {
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
};

export default authUser;