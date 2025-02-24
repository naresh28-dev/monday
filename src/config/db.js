const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("\n\t 🍏 MongoDB connected\n");
    } catch (error) {   
        console.log(error);
        console.log("\n\t 🍎 MongoDB connection failed\n");
    }
}
    module.exports = connectDB;