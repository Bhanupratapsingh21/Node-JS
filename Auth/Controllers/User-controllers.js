import { User } from "../Models/User.Models.js"
import jwt from "jsonwebtoken"

async function handleUserLogin(req, res) {
    res.json({ msg: "Sign-Up" })

}
// added a save method in models so when i save password it got increpts
async function handleUserSignUp(req, res) {

    const { name, email, password } = req.body
    if (
        [name, email, password].some((field) => field.trim() === "")
    ) {
        return res.status(400).json({ "msg": "All Fields Are Required" })
    }
    // await here
    const exitedUser = await User.findOne({
        $or: [{ name }, { email }]
    })

    if (exitedUser) {
        return res.status(409).json({ "msg": "Name Or Email Already Exists" })
    }

    const user = await User.create({
        name,
        email,
        password,
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if (!createdUser) {
        return res.status(500).json({ "msg": "Something Want Wrong While Registering User" })
    }

    return res.status(201).json({
        msg: "User Registered SuccesFully",
        createdUser,
    })
}

export {
    handleUserSignUp,
    handleUserLogin
}

