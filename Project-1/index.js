const express = require("express")
const userRouter = require("./Routes/User")
const { connectMongoDB } = require("./Connection.js")
const logreqres  = require("./MiddleWares")

const port = 4000
const app = express();

app.listen(port, () => {
    console.log(`Server is Live Running on Port:${port}`)
})

// connections
connectMongoDB("mongodb://localhost:27017/you-app1")
    .then(() => {
        console.log("Mongo connected")
    }).catch((err) => {
        console.log(err, "db connection error")
    })



// middlewares
app.use(express.urlencoded({ extended: false }))
app.use(logreqres);
app.use('/users', userRouter); 
