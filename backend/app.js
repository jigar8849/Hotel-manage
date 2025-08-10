const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const { connectToDb } = require("./src/config/db.js");  // require the db connection function
const authRouters = require("./src/routes/User.js")  // require the user router

dotenv.config();

//Databse connection
connectToDb();

app.use(express.json());
app.use(cors())
app.use(morgan('dev'));

const PORT = process.env.PORT || 3000;

app.get("/",(req,res)=>{
    res.send("Hello from server");
})

app.use("/api/auth", authRouters)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})


// 248