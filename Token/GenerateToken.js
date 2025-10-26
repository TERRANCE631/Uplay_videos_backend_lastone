import jwt from "jsonwebtoken";

export const GenerateToken = (userID, res) => {
  const secret = process.env.HIDDEN_VALUE;
  if (!secret) throw new Error("JWT secret is not defined. Please set HIDDEN_VALUE in your .env file.");

  const token = jwt.sign({ userID }, secret, { expiresIn: "7d" });

  res.cookie("token", token, {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
    sameSite: "strict",
    // secure: process.env.NODE_ENV !== "development"
  });

  return token;
};
