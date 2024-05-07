const User = require("../Models/User.Model")
async function handleGetAllUser(req, res){
    const alldbusers = await User.find({})
    return res
        .status(200)
        .json(alldbusers)
}
async function handleGetAllUserSS (req,res){
    // server side rendering 
    const alldbusers = await User.find({});
    const html = `
    <ul>${alldbusers.map((user) => `<li>${user.firstName}</li>`)}</ul>
    `
    res
        .status(200)
        .send(html);
}

async function GetUserByID (req,res){
    const user = await User.findById(req.params.id)
        if (!user) return res.status(404).json({msg : "not found"})
        return res
            .status(200)
            .json(user);
}
async function patchUserByID (req,res){
    const user = await User.findByIdAndUpdate(req.params.id, { ...req.body })
        if (!user) {
            res.status(404)
                .json({ msg: "User not found" })
        }
        return res
            .status(200)
            .json({ status: "Successfully updateduser", user })
}

async function deleteUserByID (req,res){
    const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res
            .status(404)
            .json({ msg: "User not found" })
        }
        return res
            .status(200)
            .json({ status: "Successfully Deleted User" })
}

async function CreateUser (req,res){
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

}

module.exports = {
    handleGetAllUser,
    CreateUser,
    deleteUserByID,
    patchUserByID,
    GetUserByID,
    handleGetAllUserSS,
}