import express from "express";
import mongoose from "mongoose";
import User from "./models/user.js";
import authRoute from "./routes/auth.js";
import jobsRoute from "./routes/jobs.js";
import cors from "cors"
import dotenv from 'dotenv';
dotenv.config();

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors({ origin: true, credentials: true }));

const DB = process.env.DATABASE; 
const port = process.env.PORT || 9002;
// "mongodb://localhost:27017/myLoginRegisterDB"
//mongodb connect
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB connected")
})

app.use("/", authRoute)
app.use("/", jobsRoute)


app.get("/",(req,res)=>{
    res.json("server start..!!!");
})


app.get("/all",(req,res)=>{
    User.find({},(err,user)=>{
        res.send(user);
    })
})

app.listen(port, () => {
    console.log("BE started at port 9002")
})
