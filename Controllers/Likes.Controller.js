import { db } from "../db/db.js";

// start of likes section
export const deleteLike = (req, res) => {
    const mysqlQuery = "DELETE FROM likes WHERE ID=?";
    const id = req.params.id

    db.query(mysqlQuery, [id], (err, data) => {
        if (err) return res.send(err || "Database error occured!");
        res.json(data);
    })
};

export const Likes = (req, res) => {
    const mysqlQuery = "INSERT INTO likes (`username`, `videoID`, `userID`, `videoUserID`) VALUES (?)";
    const mysqlQuery_likes = "CREATE TABLE IF NOT EXISTS likes ( username VARCHAR(300), videoID INT, videoUserID INT, userID INT, id INT PRIMARY KEY AUTO_INCREMENT)";
    console.log(req.body);

    const values = [
        req.body.username,
        req.body.videoID,
        req.body.userID,
        req.body.videoUserID
    ];

    db.query(mysqlQuery_likes);
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
