// import mongoose from "mongoose";
const Category = require('../models/category');

function timeout(number) {
    return new Promise(res => setTimeout = (res, number))
}

const getCategory = async (req, res) => {
    try {
        const category = await Category.find();
        res.status(200).json(category)
        await timeout(300)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const createCategory = async (req, res) => {
    const post = req.body;
    const newPost = new Category(post)

    try {
        await newPost.save();
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}
module.exports = { getCategory, createCategory };
