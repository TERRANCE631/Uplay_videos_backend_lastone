import { db } from "../db/db.js";

// deleting video from database
export const deleteVideo = (req, res) => {
    const mysqlQuery = "DELETE FROM videos WHERE ID=?";
    const id = req.params.id
    console.log(req.params);

    db.query(mysqlQuery, [id], (err, data) => {
        if (err) return res.send(err || "Database error has occured!");
        res.json(data);
        console.log(data);
        console.log(req.params);
    })
}

// posting videos section
export const videos = async (req, res) => {
    const mysqlQuery = "INSERT INTO videos (`username`, `video`, `title`, `userID`, `downloads`, `likes`, `clicks`, `created_At`, `id`, `photo`, `category`) VALUES (?)";
    const mysqlCreateTable = "CREATE TABLE IF NOT EXISTS videos ( username VARCHAR(300), video VARCHAR(300), title VARCHAR(300), userID INT, downloads INT, likes INT, clicks INT, created_At VARCHAR(300), id INT PRIMARY KEY AUTO_INCREMENT, photo VARCHAR(300), category VARCHAR(300))";

    const date = new Date();
    const timeAndDate = `${date.toDateString()}`;
    console.log(req.body);

    const values = [
        req.body.username,
        req.body.video = `${req.protocol}://${req.get("host")}/videos/${req.body.video}`,
        req.body.title,
        req.body.userID,
        req.body.downloads = 0,
        req.body.likes = 0,
        req.body.clicks = 0,
        req.body.create_At = timeAndDate,
        req.body.id = Math.floor(Math.random() * 1000000),
        req.body.photo,
        req.body.category,
    ];

    db.query(mysqlCreateTable);
    db.query(mysqlQuery, [values], (err, data) => {
        if (err) return res.send(err || "Database error occured!");
        res.json(data)
    })
};

export const getVideos = async (req, res) => {
    const mysqlQuery = "SELECT * FROM videos";

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
