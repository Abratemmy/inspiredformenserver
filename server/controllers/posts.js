const db = require("../config/database");
const jwt = require("jsonwebtoken");

const getPosts = (req, res) => {
    const q = `
        SELECT p.*, u.id AS userId, u.firstName, u.lastName, u.email 
        FROM posts AS p 
        JOIN users AS u ON u.id = p.userId
    `;

    db.query(q, (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }
        // Restructure each post
        const formatted = data.map(post => {
            const { firstName, lastName, email, ...rest } = post;
            return {
                ...rest,
                users: {
                    firstName,
                    lastName,
                    email
                }
            };
        });

        return res.status(200).json(formatted);
    });
};


const getPost = async (req, res) => {
    // }
    let { topic } = req.params;

    // Convert the slug (todays-topic-is-life) back to normal (todays topic is life)
    const normalTopic = topic.split("-").join(" ");

    const q = "SELECT * FROM posts WHERE LOWER(topic) = LOWER(?)";

    db.query(q, [normalTopic], (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }
        if (data.length === 0) {
            return res.status(404).json("Post not found!");
        }
        console.log("Fetched single posts", data[0])
        return res.status(200).json(data[0]);
    });

}

const createPost = async (req, res) => {
    const token = req.cookies.accessToken
    if (!token) return res.status(401).json("Not aunthenticated")

    jwt.verify(token, "jwtKey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "INSERT INTO posts (`topic`, `category`, `postername`, `image`, `video`, `message`, `createdAt`, `userId`) VALUES (?)";
        const values = [
            req.body.topic,
            req.body.category,
            req.body.postername,
            req.body.image,
            req.body.video,
            req.body.message,
            new Date(),
            userInfo.id
        ]

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Post has been created");
        })
    })
}

const updatePost = async (req, res) => {
    const token = req.cookies.accessToken
    if (!token) return res.status(401).json("Not aunthenticated")

    jwt.verify(token, "jwtKey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const postId = req.params.id
        const q = "UPDATE posts SET `topic`=?, `category`=?, `postername`=?, `image`=?, `video`=?, `message`=? WHERE `id` = ? "
        const values = [
            req.body.topic,
            req.body.category,
            req.body.postername,
            req.body.image,
            req.body.video,
            req.body.message,
        ]

        db.query(q, [...values, postId, userInfo.Id], (err, data) => {
            if (err) return res.status(500).json(err);
            console.log("Post updated")
            return res.status(200).json("Post has been updated");
        })
    })

}

const deletePost = async (req, res) => {
    const token = req.cookies.accessToken
    if (!token) return res.status(401).json("Not aunthenticated")

    jwt.verify(token, "jwtKey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!")

        const postId = req.params.id;
        const q = "DELETE FROM posts WHERE `id` = ? "

        db.query(q, [postId, userInfo.id], (err, data) => {
            if (err) return res.status(403).json("You can only delete your post!");

            return res.json("Post has been deleted! ")
        })

    })
    // const { id } = req.params;

    // if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    // await PostMessage.findByIdAndRemove(id);

    // res.json({ message: "post deleted successfully" })

}

// const likePost = async (req, res) => {
//     const { id } = req.params;

//     if (!req.userId) return res.json({ message: "Unathenticated" });

//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

//     const post = await PostMessage.findById(id);


//     const index = post.likes.findIndex((id) => id === String(req.userId));
//     if (index === -1) {
//         // like the post
//         post.likes.push(req.userId)
//     } else {
//         // dislike the post
//         post.likes = post.likes.filter((id) => id !== String(req.userId))
//     }
//     const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

//     res.json(updatedPost)
// }


// const commentPost = async (req, res) => {
//     const { id } = req.params;
//     const { value } = req.body;

//     // console.log(`Adding comment to post with id ${id}`)

//     const post = await PostMessage.findById(id);

//     if (!post) {
//         return res.status(404).json({ status: false, message: `Could not find post with id ${id}` })
//     }
//     const update = {
//         $push: {
//             usercomment: {
//                 comment: value.comment,
//                 postedBy: value.postedBy
//             }
//         }
//     }
//     const updatedPost = await PostMessage.findByIdAndUpdate(id, update, { new: true });
//     // console.log("value controller", JSON.stringify(value))

//     res.status(200).json(updatedPost)

// }

// const fetchComment = async (req, res) => {
//     const { id } = req.params;

//     try {
//         const post = await PostMessage.findById(id);
//         res.status(200).json(post)
//     } catch (error) {
//         res.status(404).json({ message: error.message })
//     }
// }
module.exports = { getPosts, getPost, createPost, updatePost, deletePost };