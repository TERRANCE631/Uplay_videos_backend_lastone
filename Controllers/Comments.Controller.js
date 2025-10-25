import { db } from "../db/db.js";

// starting comment section
export const postComments = (req, res) => {
    const mysqlQuery_createTable = "CREATE TABLE IF NOT EXISTS comments ( comment VARCHAR(200), username VARCHAR(200), videoID INT, userID INT, date VARCHAR(200), profile_image VARCHAR(200), id INT PRIMARY KEY AUTO_INCREMENT )";

    const mysqlQuery = "INSERT INTO comments ( `comment`, `username`, `videoID`, `userID`, `date`, `profile_image` ) VALUES (?)";
    console.log(req.body);

    const values = [
        req.body.comment,
        req.body.username,
        req.body.videoID,
        req.body.userID,
        req.body.date,
        req.body.profile_image
    ];

    db.query(mysqlQuery_createTable);
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
