const express = require("express")
const users = require("./MOCK_DATA.json")

const app = express();

const port = 4000

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
    res.send(html);

})

// dynamic path patameter


app.route("/api/user/:id")
.get((req,res)=>{
    
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);

})
.patch((req,res)=>{
    return res.json({status : "panding"})
})
.post((req,res)=>{
    return res.json({status : "panding"})
})
.delete((req,res)=>{
    return res.json({status : "panding"})
})

app.post("/api/users",(req,res)=>{
    return res.json({status : "panding"})
});

app.route("/api/users/:id",(req,res)=>{
    return res.json({status : "panding"})
});

app.patch("/api/users/:id",(req,res)=>{
    return res.json({status : "panding"})
});