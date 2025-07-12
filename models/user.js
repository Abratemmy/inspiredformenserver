// const mongoose = require('mongoose');

// const userSchema = mongoose.Schema({
//     firstName: { type: String, required: true },
//     lastName: { type: String, required: true },
//     email: { type: String, required: true },
//     password: { type: String, required: true },
//     id: { type: String }
// }, { timestamps: true })


// // export default mongoose.model("User", userSchema);
// const User = mongoose.model('User', userSchema);
// module.exports = User;


// now using mysql database with sequelize
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // your DB connection instance

const User = sequelize.define('User', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true
});

module.exports = User;


