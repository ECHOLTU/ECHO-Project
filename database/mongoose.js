require('dotenv').config();

const mongoose = require('mongoose');


const connectDB = async () => {
    try {

        mongoose.set("strictQuery", false);
        mongoose.connect(process.env.MONGOOSE_LOGIN);
        console.log("connected to MongoDB");

    } catch (err) {
        console.log(err);
    }
}

connectDB();