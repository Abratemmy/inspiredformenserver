const db = require("../config/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser")

const signup = async (req, res) => {
    // CHECK EXISTING USER
    const q = "SELECT * FROM users WHERE email = ?";

    db.query(q, [req.body.email], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("Email already exists!");

        // HASH PASSWORD AND CREATE USER
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO users(`firstName`, `lastName`, `email`, `password`, `isAdmin`) VALUES (?)";
        const values = [
            req.body.firstName,
            req.body.lastName,
            req.body.email,
            hash,
            req.body.isAdmin ? 1 : 0
        ];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            console.log("User has been created");
            return res.status(200).json("User created successfully.");

        });
    });
}

const signin = async (req, res) => {
    //CHECK USER
    const q = "SELECT * FROM users WHERE email = ?";
    db.query(q, [req.body.email], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("User not found!");

        //CHECK PASSWORD
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);
        if (!isPasswordCorrect) return res.status(400).json("Wrong password or email!");

        const token = jwt.sign({ id: data[0].id }, "jwtKey", { expiresIn: '1h' });

        const { password, ...other } = data[0];

        res.cookie("accessToken", token, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
            secure: true, // Required for HTTPS
            sameSite: "None"// only send cookie over HTTPS in production
        }).status(200).json(other);

    });
}


const logout = (req, res) => {
    res.clearCookie("accessToken", {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
    });

    return res.status(200).json("User has been logged out");
};


// "check if user is authenticated or token as expired "
const checkIfTokenisExpired = (req, res) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json('Not authenticated');
    }

    jwt.verify(token, "jwtKey", (err, user) => {
        if (err) return res.status(403).json('Token is not valid or expired');
        res.status(200).json('Authenticated');
    });
};

module.exports = { signup, signin, logout, checkIfTokenisExpired };