import express from "express";
import { addComments, getComments } from "../controllers/comment.js";

const router = express.Router();

// router.post('/:id/comments', addComments);
// router.get('/:id/comments', getComments);

export default router;

