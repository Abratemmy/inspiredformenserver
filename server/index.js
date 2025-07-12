const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const compression = require("compression");

const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/users');
const categoryRoutes = require('./routes/category');

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(compression({
    level: 6,
    threshold: 100 * 1000,
    filter: (req, res) => {
        if (req.headers['x-no-compression']) {
            return false
        }
        return compression.filter(req, res)
    }
}))

app.use('/user', userRoutes);
app.use('/posts', postRoutes);
app.use('/category', categoryRoutes)

app.get('/', (req, res) => {
    res.send("Welcome to inspiredformen API")
})


const CONNECTION_URL = process.env.CONNECTION_URL
const PORT = process.env.PORT || 5000;

mongoose.set('strictQuery', true);
const startServer = async () => {
    try {
        await mongoose.connect(CONNECTION_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            bufferCommands: false,
            minPoolSize: 100
        });
        console.log("Connected to MongoDB");

        app.listen(PORT, () => {
            console.log(`Server running on port: ${PORT}`);
        });
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
    }
};

startServer();

