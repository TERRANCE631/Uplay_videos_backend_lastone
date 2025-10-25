import { db } from "../db/db.js";

// starting setion of handling subscribers
export const Subscribers = (req, res) => {
    const mysqlQuery_createTable = "CREATE TABLE IF NOT EXISTS subscribers ( username VARCHAR(200), sub__To VARCHAR(200), profile_photo VARCHAR(200), userID INT, videoID INT, videoUserID INT, id INT PRIMARY KEY AUTO_INCREMENT )";
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

    db.query(mysqlQuery_createTable);
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
