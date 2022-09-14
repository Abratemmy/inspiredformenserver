import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
    name: { type: String, required: true },
    comment:{type: String, required: true},
    id:{type: String},
    post_id: {type: String, required: true}
}, {timestamps: true})

 
const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
