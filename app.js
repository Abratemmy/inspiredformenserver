const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const dotenv = require('dotenv');
const db = require('./config/database.js');

const postRoutes = require('./routes/posts.js');
const userRoutes = require('./routes/users.js');
const authRoutes = require('./routes/auth.js');
const commentRoutes = require('./routes/comments.js');
const likeRoutes = require('./routes/likes.js');

dotenv.config();
const app = express();

// === Database Connection == = 
db.connect((err) => {
    if (err) {
        console.error('❌ Database connection failed:', err.stack);
        return;
    }
    console.log('✅ Connected to MySQL database');
});

const allowedOrigins = [
    'http://inspiredformen.com',
    'https://inspiredformen.com',
    'http://admin.inspiredformen.com',
    'https://admin.inspiredformen.com',
    'http://localhost:8000',
    'https://localhost:8000'
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(express.json());
app.use(cookieParser())

// === File Uploads (Multer) ===
const upload = multer({ dest: __dirname + '/uploads/' }); // Absolute path safer on cPanel
app.post('/upload', upload.single('file'), (req, res) => {
    res.status(200).json("✅ Image uploaded successfully");
});


app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);



// Default route
app.get('/', (req, res) => {
    res.send('Welcome to InspiredForMen API running on MySQL & Express');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
