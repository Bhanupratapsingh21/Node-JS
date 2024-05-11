import express from "express";
import urlRoute from "./Routes/url.js";
import dotenv from "dotenv";
import ConnectDb from "./utills/connect.js";
import cors from "cors";
import ejs from "ejs"
import path from "path" 
import url from "./Models/Models.js";

dotenv.config({
    path: "./.env"
});

const app = express();
const port = 4000;

const allowedOrigins = ['http://localhost:5173']; // Add your frontend domain(s) here

// Enable CORS middleware with specific origins
app.use(cors({
  origin: allowedOrigins
}));


app.use(express.json());

// for server site 
app.set("view engine","ejs");

app.set("views" ,path.resolve('./view'))


ConnectDb()
    .then(() => {
        // Start server
        app.listen(port, () => {
            console.log(`Server Is Running At Port : ${port}`);
        });

        // Define routes
        app.use("/url", urlRoute);

        app.get("/testejs" , async(req,res)=>{
            const allURLS = await url.find({});
            return res.render("home")
        })

    })
    .catch(err => {
        console.log("MongoDB connection failed!!", err);
    });

/*

.then(()=>{

    app.on("error",(error)=>{
        console.log("error not able to listin",error);
    })
    
    app.listen(process.env.PORT || 8000 , ()=>{
        console.log(`Server iS Running At Port ${process.env.PORT}`)
    })
})
.catch(
    (err)=>{
        console.log("moogoDb connenation failed !! ::" , err )
})
*/