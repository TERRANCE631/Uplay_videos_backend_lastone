import { db } from "../db/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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
        const mysqlQuery = `SELECT * FROM users`;
        {
            req.userToken !== undefined && db.query(mysqlQuery, (err, authUser) => {
                if (err) return res.status(404).json("Error occured on 👉👉checkAuth request", + " | " + err);
                const findUser = authUser.find((user) => user.id === req.userToken)
                res.status(202).json(findUser)
            })
        };
    } catch (error) {
        res.status(500).json("Error occured on 👉👉checkAuth request", + " | " + error);
        console.log("Error occured on 👉👉checkAuth request", + " | " + error);
    };
};

export const logout = (req, res) => {
    try {
        res.cookie("token", "", { maxAge: 0 })
        res.status(200).json({ message: "You have successfully logged out" });

    } catch (error) {
        res.status(500).json("Error in 👉logout controller" + " | Error " + error.message);
    };
};

// admin section
export const Register = async (req, res) => {
    try {
        const mysqlQuery = "INSERT INTO users (`username`, `email`, `password`, `profile_image`, `token`, `id`) VALUES (?)";
        const mysqlCreateTable = "CREATE TABLE IF NOT EXISTS users (username VARCHAR(200), email VARCHAR(200), password VARCHAR(200), profile_image VARCHAR(300), token VARCHAR(300), id INT PRIMARY KEY AUTO_INCREMENT )";

        const userID = Math.floor(Math.random() * 1000000000)
        const salt = bcrypt.genSaltSync(10);
        const values = [
            req.body.username = req.body.username.trim(),
            req.body.email = req.body.email.trim(),
            req.body.password = bcrypt.hashSync(req.body.password.trim(), salt),
            req.body.profile_image = `${req.protocol}://${req.get("host")}/images/${req.body.profile_image}`,
            req.body.token = jwt.sign({ userID }, process.env.HIDDEN_VALUE, { expiresIn: "7d" }),
            req.body.id = userID
        ];

        db.query(mysqlCreateTable);
        db.query(mysqlQuery, [values], (err, data) => {
            if (err) return res.status(500).json("Error occured on 👉👉register mysqlQuery" + " | " + err)
            GenerateToken(userID, res);
            res.json({ registered: `You are successfully registered!` });
        });
        console.log(req.body);

    } catch (error) {
        res.status(500).json("Error occured on 👉👉register request" + " | " + error);
        console.log("Error occured on 👉👉register request" + " | " + error);
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