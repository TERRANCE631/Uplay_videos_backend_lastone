import { db } from "../db/db.js";
import bcrypt from "bcryptjs";
import { GenerateToken } from "../Token/GenerateToken.js";

// starting user's profile section
export const getUsersById = (req, res) => {
    const mysqlQuery = "SELECT * FROM users WHERE ID=?";
    const id = req.params.id;

    db.query(mysqlQuery, [id], (err, data) => {
        if (err) return res.send(err || "Database error has occured!");
        res.json(data[0]);
        console.log(data[0]);
    })
};
// end of user's profile section

export const checkAuth = (req, res) => {
    try {
        const mysqlQuery = "SELECT * FROM users WHERE id = ?";
        db.query(mysqlQuery, [req.userToken], (err, results) => {
            if (err) return res.status(500).json("checkAuth query error | " + err);
            if (!results.length) return res.status(404).json("User not found");

            res.status(200).json(results[0]); // return the user object
        });
    } catch (error) {
        console.log("checkAuth error:", error);
        res.status(500).json("checkAuth request error | " + error);
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("token", "", {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            expires: new Date(0), // set to expire immediately
        });

        res.status(200).json({ message: "You have successfully logged out" });
    } catch (error) {
        res
            .status(500)
            .json("Error in 👉logout controller | Error " + error.message);
    }
};

// admin section
export const Register = async (req, res) => {
    try {
        const mysqlCreateTable = `
            CREATE TABLE IF NOT EXISTS users (
                username VARCHAR(200),
                email VARCHAR(200),
                password VARCHAR(200),
                profile_image VARCHAR(300),
                token VARCHAR(300),
                id INT PRIMARY KEY AUTO_INCREMENT
            )`;
        db.query(mysqlCreateTable);

        const userID = Math.floor(Math.random() * 1000000000);
        const salt = bcrypt.genSaltSync(10);

        const values = [
            req.body.username.trim(),
            req.body.email.trim(),
            bcrypt.hashSync(req.body.password.trim(), salt),
            req.body.profile_image ? `${req.protocol}://${req.get("host")}/images/${req.body.profile_image}` : null,
            null, // token will be set after creation
            userID
        ];

        const mysqlQuery = "INSERT INTO users (username, email, password, profile_image, token, id) VALUES (?)";

        db.query(mysqlQuery, [values], (err, data) => {
            if (err) return res.status(500).json("Register query error | " + err);

            // Generate JWT token and set cookie
            const token = GenerateToken(userID, res);

            // Update user row with the token in DB
            db.query("UPDATE users SET token = ? WHERE id = ?", [token, userID]);

            res.json({ registered: "You are successfully registered!", token });
        });

    } catch (error) {
        console.log("Register error:", error);
        res.status(500).json("Register request error | " + error);
    }
};

export const LogIn = async (req, res) => {
    try {
        const mysqlQuery = "SELECT * FROM users WHERE username=?";
        const { username, password } = req.body

        db.query(mysqlQuery, [username], (err, data) => {
            if (err) return res.status(500).json("Error occured on 👉👉LogIn mysqlQuery" + " | " + err);
            if (data.length > 0) {
                const matchOrNot = bcrypt.compareSync(password, data[0].password);
                if (matchOrNot && data.length > 0) {
                    GenerateToken(data[0].id, res);
                    res.status(200).json({ user: data[0] });
                } else {
                    res.json({ message: "Incorrect username / password" });
                }
            } else {
                res.json({ message: "Incorrect username / password" });
            }
        });
    } catch (error) {
        res.status(500).json("Error occured on 👉👉LogIn request" + " | " + error);
        console.log("Error occured on 👉👉LogIn request" + " | " + error);
    }
};

export const getUsers = async (req, res) => {
    const mysqlQuery = "SELECT * FROM users";

    db.query(mysqlQuery, (err, data) => {
        if (err) return res.send(err || "Error occured on Database!")
        res.json(data)
    })
};

export const userID = async (req, res) => {
    const mysqlQuery = "SELECT * FROM users WHERE ID=?";
    const id = req.params.id;

    db.query(mysqlQuery, [id], (err, data) => {
        if (err) return res.send(err || "Error occured on Database!")
        res.json(data[0])
    })
};
// end of admin section