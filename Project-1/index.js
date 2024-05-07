const express = require("express")
const mongoose = require("mongoose");


// connections
mongoose.connect("mongodb://localhost:27017/you-app1")
    .then(() => {
        console.log("Mongo connected")
    }).catch((err) => {
        console.log(err, "db connection error")
    })

// Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
    },
    jobTitle: {
        type: String
    }
}, {
    timestamps: true
})

// model
const User = mongoose.model("user", userSchema);

const port = 4000
const app = express();
app.listen(port, () => {
    console.log(`Server is Live Running on Port:${port}`)
})

// middlewares
app.use(express.urlencoded({ extended: false }))
app.use((req, res, next) => {
    console.log("Middleware one")
    req.sendtonextmiddle = "hello from one"
    next();
})

app.use((req, res, next) => {
    console.log(req.sendtonextmiddle)
    console.log("Middleware two")
    next();
})


app.get("/api/users", async (req, res) => {
    const alldbusers = await User.find({})
    return res
        .status(200)
        .json(alldbusers)
})

app.get("/users", async (req, res) => {
    // server side rendering 
    const alldbusers = await User.find({});
    const html = `
    <ul>${alldbusers.map((user) => `<li>${user.firstName}</li>`)}</ul>
    `
    res
        .status(200)
        .send(html);
})

// dynamic path patameter and route created

app.route("/api/users/:id")
    .get(async (req, res) => {
        const user = await User.findById(req.params.id)
        if (!user) return res.status(404)
        return res
            .status(200)
            .json(user);
    })
    .patch(async (req, res) => {
        const user = await User.findByIdAndUpdate(req.params.id, { ...req.body })
        if (!user) {
            res.status(404)
                .json({ msg: "User not found" })
        }
        return res
            .status(200)
            .json({ status: "Successfully updateduser", user })
    })
    .post(async (req, res) => {
        const user = await User.findByIdAndUpdate(req.params.id, { ...req.body })
        if (!user) {
            res.status(404)
                .json({ msg: "User not found" })
        }
        return res.status(200)
            .json({ status: "Successfully updated user", user })
    })
    .delete(async (req, res) => {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            res.status(404)
                .json({ msg: "User not found" })
        }
        return res
            .status(200)
            .json({ status: "Successfully Deleted User" })
    })

app.post("/api/users", async (req, res) => {
    const body = req.body;
    // chacking data come from user or not
    if (
        !body ||
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.gender ||
        !body.job_title
    ) {
        return res
            .status(400)
            .json({
                msg: "All fields are req..."
            });

    }
    // call db to create a user
    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title,
    });

    return res
        .status(201)
        .json({ mgs: "Successfully added" })

});
