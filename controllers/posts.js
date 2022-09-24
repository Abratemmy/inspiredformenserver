import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

function timeout(number){
    return new Promise(res => setTimeout=(res, number))
}
export const getPosts = async(req, res) => {
    try {
        const postMessages =await PostMessage.find();
        res.status(200).json(postMessages)
        await timeout(300)
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}

export const getPost = async (req, res ) => {
    let { topic} = req.params;
    // topic.replace(/\s+/g, '-') = req.params
    const slug = topic.split("-").join(" ")
    try {
        const post = await PostMessage.findOne({topic: slug});
        // const post = await PostMessage.findOne({topic: topic.replace(/\s+/g, '-')});
        console.log("get a single post", post)
        res.status(200).json(post)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createPost = async(req, res) => {
    const post = req.body;
    const newPost = new PostMessage(post)

    try {
        await newPost.save();
    } catch (error) {
        res.status(409).json({ message: error.message})
    }
}

export const updatePost = async(req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');


    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id }, {new: true});
    res.json(updatedPost);

}

export const deletePost = async(req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "post deleted successfully"})

}

export const likePost = async(req, res) => {
    const {id} = req.params;

    if(!req.userId) return res.json({message: "Unathenticated"});

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    const post = await PostMessage.findById(id);
    

    const index = post.likes.findIndex((id) => id=== String(req.userId));
    if(index === -1){
        // like the post
        post.likes.push(req.userId)
    }else {
        // dislike the post
        post.likes = post.likes.filter((id) => id !== String(req.userId))
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post , {new: true});

    res.json(updatedPost)
}

export const commentPost = async(req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    // console.log(`Adding comment to post with id ${id}`)

    const post= await PostMessage.findById(id);

    if(!post){
        return res.status(404).json({ status: false, message: `Could not find post with id ${id}`})
    }
    const update = { 
        $push: {
          usercomment: {
            comment: value.comment,
            postedBy: value.postedBy
          }
        }
      }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, update, {new: true});
    // console.log("value controller", JSON.stringify(value))
 
    res.status(200).json(updatedPost)

}

export const fetchComment = async(req, res) => {
    const {id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        res.status(200).json(post)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}