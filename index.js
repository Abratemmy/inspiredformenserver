import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
// const AutoIncrement = require('mongoose-sequence')(mongoose);
import cors from "cors";
import dotenv from "dotenv";
import compression from "compression";

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import categoryRoutes from './routes/category.js'

const app = express();
dotenv.config();



app.use(bodyParser.json({limit: "30mb", extended:true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended:true}));
app.use(cors()); 
app.use(compression({
    level: 6,
    threshold:100 * 1000,
    filter: (req, res) => {
        if(req.headers['x-no-compression']){
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
const PORT = process.env.PORT || 5000 ;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true, minPoolSize: 100})
    .then(() => app.listen(PORT, () => console.log(`server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message))

