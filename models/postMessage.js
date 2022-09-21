import mongoose from 'mongoose';

import Inc from "mongoose-sequence";

const AutoIncrement = Inc(mongoose); 


const postSchema = mongoose.Schema({
    topic: String,
    postername:String,
    category:String,
    image:String,
    video:String,
    message:String,
    likes: {
        type: [String],
        default: []
    },
    usercomment:[
        {
            comment:String,
            postedBy:String,
            id:{type: String},
            createdAt: {
                type:Date,
                default:new Date()
            },
        }
    ],
    createdAt: {
        type:Date,
        default:new Date()
    },
 
})
postSchema.plugin(AutoIncrement, {inc_field: 'id'});
// postSchema.plugin(AutoIncrement)
const PostMessage = mongoose.model('PostMessage', postSchema);
export default PostMessage;