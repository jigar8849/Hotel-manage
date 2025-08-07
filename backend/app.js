const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");


dotenv.config();

app.use(express.json());
app.use(cors())
app.use(morgan('dev'));

const PORT = process.env.PORT || 3000;

app.get("/",(req,res)=>{
    res.send("Hello from server");
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})