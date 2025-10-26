import jwt from "jsonwebtoken";

export const protectRoute = (req, res, next) => {
    try {
        const token = req.cookies?.token;
        if (!token) return res.status(401).json("Unauthorized - No token found");

        const decoded = jwt.verify(token, process.env.HIDDEN_VALUE);
        req.userToken = decoded.userID; // THIS is the user ID from the token
        next();

    } catch (error) {
        console.log("Error in auth middleware:", error.message);
        res.status(401).json("Unauthorized - Invalid token");
    }
};
