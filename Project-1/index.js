const express = require("express")
const users = require("./MOCK_DATA.json")
const fs = require("fs")
const app = express();

const port = 4000

app.use(express.urlencoded({extended:false}))

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

    // console.log(req.body);
    const body = req.body;
    users.push({...body, id : users.length+1})
    fs.writeFile("./MOCK_DATA.json" , JSON.stringify(users), (err,res)=>{
        if(err){
            res.json({ massage : "Something Want wrong"})
        }
    })
    return res.json({status : "Successfully added",id: users.length})

});

app.route("/api/users/:id",(req,res)=>{
    return res.json({status : "panding"})
});

app.patch("/api/users/:id",(req,res)=>{
    return res.json({status : "panding"})
});


// create this full app by own