const express = require("express")

const app = express()

app.listen(4000,()=>{
    console.log("Server is Running at port 4000")
})

app.get("/" ,(req,res)=>{
    return res.send("Hello from homepage"+"hey"+ req.query.name)
})
app.get("/about" ,(req,res)=>{
    return res.send("Hello from about")
})