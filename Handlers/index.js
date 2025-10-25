import { db } from "../db/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// posting videos section
export const videos = async (req, res) => {
    const mysqlQuery = "INSERT INTO videos (`username`, `video`, `title`, `userID`, `downloads`, `likes`, `clicks`, `id`, `photo`) VALUES (?)"
    console.log(req.body);

    const values = [
        req.body.username,
        req.body.video = `${req.protocol}://${req.get("host")}/videos/${req.body.video}`,
        req.body.title,
        req.body.userID,
        req.body.downloads = 0,
        req.body.likes = 0,
        req.body.clicks = 0,
        req.body.id = Math.floor(Math.random() * 1000000),
        req.body.photo
    ];

    db.query(mysqlQuery, [values], (err, data) => {
        if (err) return res.send(err || "Database error occured!");
        res.json(data)
    })
};

export const getVideos = async (req, res) => {
    const mysqlQuery = "SELECT * FROM videos ORDER BY id DESC";

    db.query(mysqlQuery, (err, data) => {
        if (err) return res.send(err || "Database error occured!")
        res.json(data);
    })
};

export const videoID = (req, res) => {
    const mysqlQuery = "SELECT * FROM videos WHERE ID=?";
    const id = req.params.id;
    console.log(id);

    db.query(mysqlQuery, [id], (err, data) => {
        if (err) return res.send(err || "Database error occured!");
        res.json(data[0]);
        console.log(data[0]);
    })
};
// end of posting videos section

// start of likes section
export const deleteLike = (req, res) => {
    const mysqlQuery = "DELETE FROM likes WHERE ID=?";
    const id = req.params.id

    db.query(mysqlQuery, [id], (err, data) => {
        if (err) return res.send(err || "Database error occured!");
        res.json(data);
    })
}

export const Likes = (req, res) => {
    const mysqlQuery = "INSERT INTO likes (`username`, `videoID`, `userID`) VALUES (?)";
    console.log(req.body);

    const values = [
        req.body.username,
        req.body.videoID,
        req.body.userID,
    ];

    db.query(mysqlQuery, [values], (err, data) => {
        if (err) return res.send(err || "Database error occured!")
        res.json({ data: data, details: req.body })
    })
};

export const getLikes = (req, res) => {
    const mysqlQuery = "SELECT * FROM likes";

    db.query(mysqlQuery, (err, data) => {
        if (err) return res.send(err || "Database error occured!");
        console.log(data);
        res.json(data);
    })
};
// end of likes section

// starting setion of handling subscribers
export const Subscribers = (req, res) => {
    const mysqlQuery = "INSERT INTO subscribers (`username`, `sub__To`, `profile_photo`, `userID`, `videoID`, `videoUserID`) VALUES (?)";
    console.log(req.body);

    const values = [
        req.body.username,
        req.body.sub__To,
        req.body.profile_photo,
        req.body.userID,
        req.body.videoID,
        req.body.videoUserID
    ];

    db.query(mysqlQuery, [values], (err, data) => {
        if (err) return res.send(err || "Database error occured!");
        res.json({ data: data, details: req.body })
    });
};

export const GetSubscribers = (req, res) => {
    const mysqlQuery = "SELECT * FROM subscribers";

    db.query(mysqlQuery, (err, data) => {
        if (err) return res.send(err || "Database error occured!");
        res.json(data);
        console.log(data);
    })
};

export const deleteSubs = (req, res) => {
    const mysqlQuery = "DELETE FROM subscribers WHERE ID=?";
    const id = req.params.id

    db.query(mysqlQuery, [id], (err, data) => {
        if (err) return res.send(err || "Database error has occured!");
        res.json(data[0]);
        console.log(data[0]);
    })
}
// end of handling subscribers

// starting comment section
export const postComments = (req, res) => {
    const mysqlQuery = "INSERT INTO comments ( `comment`, `username`, `videoID`, `userID`, `date` ) VALUES (?)";
    console.log(req.body);

    const values = [
        req.body.comment,
        req.body.username,
        req.body.videoID,
        req.body.userID,
        req.body.date
    ];

    db.query(mysqlQuery, [values], (err, data) => {
        if (err) return res.send(err || "Database error has occured!");
        res.json({ data: data, details: req.body });
    })
};

export const getComments = (req, res) => {
    const mysqlQuery = "SELECT * FROM comments";

    db.query(mysqlQuery, (err, data) => {
        if (err) return res.send(err || "Database error has occured!");
        res.json(data);
        console.log(data);
    })
};
// end of comment section

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

// deleting video from the database
export const deleteVideo = (req, res) => {
    const mysqlQuery = "DELETE FROM videos WHERE ID=?";
    const id = req.params.id

    db.query(mysqlQuery, [id], (err, data) => {
        if (err) return res.send(err || "Database error has occured!");
        res.json(data);
        console.log(data);
        console.log(req.params);
    })
}

// admin section
export const Register = async (req, res) => {
    const mysqlQuery = "INSERT INTO users (`username`, `email`, `password`, `profile_image`, `token`, `id`) VALUES (?)";
    const salt = bcrypt.genSaltSync(10);

    const values = [
        req.body.name = req.body.username.trim(),
        req.body.email = req.body.email.trim(),
        req.body.password = bcrypt.hashSync(req.body.password.trim(), salt),
        req.body.profile_image = `${req.protocol}://${req.get("host")}/images/${req.body.profile_image}`,
        req.body.token,
        req.body.id = Math.floor(Math.random() * 1000000000)
    ];
    const token = jwt.sign(
        { role: "user", salt },
        "JSON_SECRET_TOKEN",
        { expiresIn: 1000 }
    );
    res.cookie("token", token)

    db.query(mysqlQuery, [values], (err, data) => {
        res.json({ registered: `You are successfully registered!` });
    });
};

export const LogIn = async (req, res) => {
    const mysqlQuery = "SELECT * FROM users WHERE username=?";
    console.log(req.body);

    db.query(mysqlQuery, [req.body.username], (err, data) => {
        if (err) return res.send(err);
        if (data.length > 0) {
            const email = (data[0].email);
            const addemail = email;

            const token = jwt.sign(
                { role: "user", email: addemail },
                "JSON_SECRET_TOKEN",
                { expiresIn: 1000 }
            );

            const matchOrNot = bcrypt.compareSync(req.body.password, data[0].password);
            if (matchOrNot) {
                res.json({ token: token, loggedIn: `You have successfully signed in!`, id: data[0].id });
            } else {
                res.json({ error: `Incorrect password / username` });
            }
        } else {
            res.json({ error: `Incorrect password / username` });
        };

        console.log(data.length);
    });
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