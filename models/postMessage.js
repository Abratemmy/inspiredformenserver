// const mongoose = require('mongoose');
// const AutoIncrement = require('mongoose-sequence')(mongoose);


// const postSchema = mongoose.Schema({
//     topic: String,
//     postername: String,
//     category: String,
//     image: String,
//     video: String,
//     message: String,
//     likes: {
//         type: [String],
//         default: []
//     },
//     usercomment: [
//         {
//             comment: String,
//             postedBy: String,
//             id: { type: String },
//             createdAt: {
//                 type: Date,
//                 default: new Date()
//             },
//         }
//     ],
//     createdAt: {
//         type: Date,
//         default: new Date()
//     },

// })
// postSchema.plugin(AutoIncrement, { inc_field: 'id' });
// // postSchema.plugin(AutoIncrement)
// const PostMessage = mongoose.model('PostMessage', postSchema);
// module.exports = PostMessage;




// models/postMessage.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const PostMessage = sequelize.define('PostMessage', {
        topic: {
            type: DataTypes.STRING,
            allowNull: false
        },
        postername: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: true
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        },
        video: {
            type: DataTypes.STRING,
            allowNull: true
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        timestamps: true
    });

    return PostMessage;
};

// models/comment.js

module.exports = (sequelize) => {
    const Comment = sequelize.define('Comment', {
        comment: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        postedBy: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: true
    });

    return Comment;
};

// models/like.js

module.exports = (sequelize) => {
    const Like = sequelize.define('Like', {}, {
        timestamps: true
    });

    return Like;
};

// models/index.js
const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');

const User = require('./user')(sequelize);
const PostMessage = require('./postMessage')(sequelize);
const Comment = require('./comment')(sequelize);
const Like = require('./like')(sequelize);

// Associations
User.hasMany(PostMessage);
PostMessage.belongsTo(User);

PostMessage.hasMany(Comment);
Comment.belongsTo(PostMessage);

User.hasMany(Comment);
Comment.belongsTo(User);

PostMessage.hasMany(Like);
Like.belongsTo(PostMessage);

User.hasMany(Like);
Like.belongsTo(User);

module.exports = {
    sequelize,
    User,
    PostMessage,
    Comment,
    Like
};
