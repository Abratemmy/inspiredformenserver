import mongoose from 'mongoose';

import Inc from "mongoose-sequence";

const AutoIncrement = Inc(mongoose); 


// import AutoIncrement from "mongoose/mongoose-sequence"
// import AutoIncrementFactory from "mongoose-sequence"

const postSchema = mongoose.Schema({
    topic: String,
    postername:String,
    category:String,
    image:String,
    video:String,
    message:String,
    likes: {
        type: Number,
        default: 0
    },
    createdAt: {
        type:Date,
        default:new Date()
    },
    // _id: Number

})
postSchema.plugin(AutoIncrement, {inc_field: 'id'});
// postSchema.plugin(AutoIncrement)
const PostMessage = mongoose.model('PostMessage', postSchema);
export default PostMessage;