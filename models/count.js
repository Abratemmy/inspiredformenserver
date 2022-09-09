import mongoose from 'mongoose';

const counterSchema = ({
    id:{
        type: String
    },
    seq:{
        type: Number
    }
})
const counterModel = mongoose.model("counter", counterSchema);
export default counterModel;