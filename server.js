require('dotenv').config();

const cors = require('cors');
const express = require('express');
const backend = express();
const port = process.env.PORT || 3001;


backend.use(express.json());
backend.use(cors());


//database
const mongoose = require('./database/mongoose.js');

//schemas
const Accounts = require('./database/schemas/accounts.js');
const AuthCookie = require('./database/schemas/cookie.js');




backend.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});



backend.post("/api/register", async (req, res) => {
    const response = await Accounts.findOne({ email: req.body.email });

    if (response !== null) {
        res.json({ success: false, message: "User already exists!" });
    } else {
        await Accounts({ success: true, email: req.body.email, name: req.body.name, lastName: req.body.lastName, admin: false, password: req.body.password }).save();
        res.json({ success: true, message: "User has been registered!" });
    }

});


backend.post("/api/login", async (req, res) => {

    const response = await Accounts.findOne({ email: req.body.email, password: req.body.password });

    if (response) {

        let admin = false;
        if (response.admin === true) admin = true;

        //generate random string for cookie
        const randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        //save cookie
        await AuthCookie({ cookie: randomString, email: req.body.email, admin: admin, name: response.name, lastName: response.lastName }).save();

        res.json({ success: true, email: req.body.email, message: "User has been logged in!", cookie: randomString });
    } else {
        res.json({ success: false, message: "User not found" });
    }
    
});


backend.post("/api/profile", async (req, res) => {
    const account = await AuthCookie.findOne({ cookie: req.body.cookie });

    let admin = false;
    if (account?.admin === true) admin = true;

    if (account) {
        res.json({ success: true, email: account.email, name: account.name, lastName: account.lastName, admin: admin, message: "Cookie is valid" });
    } else {
        res.json({ success: false, message: "Cookie is not valid" });
    }


    // console.log(req.body.cookie);
});


backend.post("/api/delete", async (req, res) => {
    const account = await Accounts.find({ email: req.body.email });

    if (account) {
        console.log(req.body.email);

        await Accounts.deleteOne({ email: req.body.email });
        res.json({ success: true, message: "User has been deleted!" });
    } else {
        res.json({ success: false, message: "User not found!" });
    }

});




backend.post("/api/users", async (req, res) => {
    const fetchUsers = await Accounts.find({});

    res.json({ users: fetchUsers });
});




backend.listen(port, () => console.log(`server is running on port: ${port}`));