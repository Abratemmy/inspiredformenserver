
import Comment from "../models/Comment.js";
import PostMessage from "../models/postMessage.js";

export const addComments = async(req, res) => {
   let {post_id, name, comment } = req.body;

   let errors = [];
   if(isNaN(post_id)){
        errors.push('post_id must be a number')
   }

   let exist = await PostMessage.find(post_id);
   if(!exist){
        errors.push("Post with the selected ID does not exist")
    }

    if(name.length > 100){
        errors.push('Name cannot be more than 100')
    }

    if(comment.length > 255 ){
        errors.push('Comment too long');
    } 

    if(errors.length){
        return res.status(400).send({errors});
    }

    let commentModel = await Comment.save({post_id, name, comment});
    return commentModel ? res.status(201).send({data: commentModel}) : res.status(400).send({message: 'Something went wrong. Please try again'})

}

export const getComments= async (req, res)=>{
    const {post_id} = req.params.id;
    const getComments =await Comment.find(post_id);
    return getComments ? res.status(200).json(getComments) : res.status(400).json({message: 'Something went wrong. Please try again'})

}
