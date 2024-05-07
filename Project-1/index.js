const express = require("express")
const users = require("./MOCK_DATA.json")
const fs = require("fs")
const app = express();
const mongoose = require("mongoose");
const { type } = require("os");


const port = 4000
// connections
mongoose.connect("mongodb://localhost:27017/you")

// Schema
const userSchema = new mongoose.Schema({
    firstName:{
        type : String,
        required : true,
    },
    lastName:{
        type : String
    },
    email:{
        type : String,
        required : true,
        unique: true,
    },
    gender:{
        type : String,
    },
    jobTitle:{
        type : String
    }
})

// model
const User = mongoose.model("user",userSchema)

app.use(express.urlencoded({extended:false}))

app.use((req,res,next)=>{
    console.log("Middleware one")
    req.sendtonextmiddle = "hello from one"
    // res.json({msg : "middleone"})
    next();
})


app.use((req,res,next)=>{

    console.log(req.sendtonextmiddle)
    console.log("Middleware two")
    // res.json({msg : "middleone"})
    next();
})


app.listen(port , ()=>{
    console.log(`Server is Live Running on Port:${port}`)
})


app.get("/api/users",(req,res)=>{
    return res.json(users)
})

app.get("/users",(req,res)=>{
    /*
    
    */

    const html = `
    <ul>${users.map((user)=>`<li>${user.first_name}</li>`)}</ul>
    `
    res
    .status(200)
    .send(html);

})

// dynamic path patameter


app.route("/api/user/:id")
.get((req,res)=>{
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
})
.patch((req,res)=>{
    const id = Number(req.params.id);
    const newuser = req.body
    let updateduser =  {...users[id-1],...newuser}
    users[id-1] = updateduser

    fs.writeFile("./MOCK_DATA.json" , JSON.stringify(users), (err,res)=>{
        if(err){
            res.json({ massage : "Something Want wrong"})
        }
    })
    return res.json({status : "Successfully updateduser",...users[id-1]})
})
.post((req,res)=>{
    const id = Number(req.params.id);
    const newuser = req.body
    let updateduser =  {...users[id-1],...newuser}
    users[id-1] = updateduser

    fs.writeFile("./MOCK_DATA.json" , JSON.stringify(users), (err,res)=>{
        if(err){
            res.json({ massage : "Something Want wrong"})
        }
    })
    return res.json({status : "Successfully updateduser",...users[id-1]})
})
.delete((req,res)=>{
    const id = Number(req.params.id);
    const indexToRemove = users.findIndex(user => user.id === id); 
    if (indexToRemove !== -1) {
        users.splice(indexToRemove, 1); 
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
            if (err) {
                res.status(500).json({ message: "Something went wrong" });
            } else {
                res.json({ status: "Successfully removed", id: id });
            }
        });
    } else {
        res.status(404).json({ message: "User not found" });
    }
})

app.post("/api/users",(req,res)=>{
    // console.log(req.body);
    const body = req.body;
    users.push({...body, id : users.length+1})
    fs.writeFile("./MOCK_DATA.json" , JSON.stringify(users), (err,res)=>{
        if(err){
            res.json({ massage : "Something Want wrong"})
        }
    })
    return res
    .status(201)
    .json({status : "Successfully added",id: users.length})

});

// create this full app by own