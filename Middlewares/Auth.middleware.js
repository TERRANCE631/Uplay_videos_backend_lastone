import jwt from "jsonwebtoken";

export const protectRoute = (req, res, next) => {
    try {
        const token = req.cookies.token

        if (!token) return res.status(401).json("Unauthorized - No token found")

        const decoded = jwt.verify(token, process.env.HIDDEN_VALUE);

        if (!decoded) {
            return res.status(401).json("Unauthorized - Invalid token")
        };

        req.userToken = decoded.userID;
        next();

    } catch (error) {
        res.status(500).json("Error in 👉👉auth middlware", error.message);
        console.log("Error in 👉👉auth middlware", error.message);
    }
};