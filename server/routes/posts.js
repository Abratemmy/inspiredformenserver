

const express = require("express");
const { getPost, getPosts, createPost, updatePost, deletePost } = require("../controllers/posts.js");
// const auth = require("../middleware/auth");

const router = express.Router();

router.get('/', getPosts);
router.get("/:topic", getPost)
router.post('/', createPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);


module.exports = router;