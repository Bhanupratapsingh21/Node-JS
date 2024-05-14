import express from 'express'
import ConnectDb from './Utils/ConnectionDb.js';
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from 'cookie-parser'
import userRoute from "./Routes/User-Routes.js"


dotenv.config({
    path: "./.env"
});

const app = express();
const corsOptions = {
    origin: '*'
};

app.use(cors(corsOptions));

// middlewares 
app.use(express.json());
app.use(cookieParser());

ConnectDb()
    .then(()=>{
        app.listen(process.env.PORT,()=>{
            console.log(`Server Is Live & Running At Port : ${process.env.PORT}`)
        })
        app.get("/test" ,(req,res)=>{
            res.status(200).json({"MSG" : "TEST SUCCESSFULL"})
        })
        // Home
        app.get("/",(req,res)=>{
            res.status(200).json({"MSG" : "Home"})
        })
        // Routes
        app.use("/users",userRoute);

    })
    .catch((error)=>{
        console.log("Error in DB Connetions", error)
    })