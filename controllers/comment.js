const db = require("../config/database");

const getComments = (req, res) => {
    const q = `SELECT * FROM comments WHERE postId = ?`;

    db.query(q, [req.query.postId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};

const addComment = (req, res) => {
    const q = "INSERT INTO comments(`comment`, `postedBy`, `createdAt`, `userId`, `postId`) VALUES (?)";
    const values = [
        req.body.comment,
        req.body.postedBy,
        new Date(),
        req.body.userId,
        req.body.postId
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Comment has been created.");
    });
};

module.exports = { getComments, addComment };

