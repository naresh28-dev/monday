
const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./routes/router");
const connectDB = require("./config/db");
const ErrorHandling = require("./middleware/Error");

// Use CORS middleware with options
app.use(cors({
    origin: "*", // Allow all origins (for development)
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"] // Allowed headers
}));

app.use(express.json());
app.use((req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    next();
});
app.use(bodyParser.json());
app.use("/api/v1",router);
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/api",(req,res)=>{
    res.status(200).json({message:"Welcome to the API 💻","✅":"sever is running sucessfully"});
}
)
// Error Handling Middleware (Fixed)
app.use(ErrorHandling); // Do NOT call it as a function

app.listen(port, () => {
    console.log(`\n\t Server is running on port ${port}\n\t http://127.0.0.1:${port}\n`);
    });
    
console.log(connectDB());    
