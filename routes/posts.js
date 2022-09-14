import express from "express";
import { getPost, getPosts, createPost, updatePost, deletePost, likePost , commentPost} from "../controllers/posts.js"
import auth from "../middleware/auth.js"

const router = express.Router();

router.get('/:id',  getPost )
router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
router.post('/:id/commentPost',  commentPost);
router.patch('/:id/likePost', auth , likePost);


export default router  