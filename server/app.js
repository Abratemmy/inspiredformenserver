const express = require('express');
const cors = require('cors');
const postRoutes = require('./routes/posts.js');
const userRoutes = require('./routes/users.js');
const authRoutes = require('./routes/auth.js');
const commentRoutes = require('./routes/comments.js');
const likeRoutes = require('./routes/likes.js');
const cookieParser = require('cookie-parser');
const multer = require("multer");



const app = express();

const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));

app.use(express.json());
app.use(cookieParser())

const upload = multer({ dest: './uploads/' })

app.post('/upload', upload.single('file'), function (req, res) {
    res.status(200).json("Image has been uploaded")
})


app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);



// Default route
app.get('/', (req, res) => {
    res.send('Welcome to inspiredformen API with MySQL');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
