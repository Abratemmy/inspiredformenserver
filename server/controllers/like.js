const db = require("../config/database");
const jwt = require("jsonwebtoken");

const getLikes = (req, res) => {
    const q = "SELECT userId FROM likes WHERE postId = ?";

    db.query(q, [req.query.postId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data.map(like => like.userId));
    });
}

const addLike = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Please log in before you can like a post!");

    jwt.verify(token, "jwtKey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid! please log in again!");

        const q = "INSERT INTO likes (`userId`,`postId`) VALUES (?)";
        const values = [
            userInfo.id,
            req.body.postId
        ];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            console.log("Post liked by user with ID:", userInfo.id);
            return res.status(200).json("Post has been liked.");
        });
    });
};

const deleteLike = (req, res) => {

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Please log in before you can delete a like!");

    jwt.verify(token, "jwtKey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "DELETE FROM likes WHERE `userId` = ? AND `postId` = ?";

        db.query(q, [userInfo.id, req.query.postId], (err, data) => {
            if (err) return res.status(500).json(err);
            console.log("Post disliked by user with ID:", userInfo.id);
            return res.status(200).json("Post has been disliked.");
        });
    });
};

module.exports = { getLikes, addLike, deleteLike };