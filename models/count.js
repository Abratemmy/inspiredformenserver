const mongoose = require('mongoose');

const counterSchema = ({
    id: {
        type: String
    },
    seq: {
        type: Number
    }
})
const counterModel = mongoose.model("counter", counterSchema);
module.exports = counterModel;