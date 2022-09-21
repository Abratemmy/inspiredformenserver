import express from "express";
import { getCategory, createCategory } from "../controllers/category.js";



const router = express.Router();

router.post('/', createCategory);
router.get('/', getCategory);



export default router;