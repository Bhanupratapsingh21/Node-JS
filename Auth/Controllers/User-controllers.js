import { User } from "../Models/User.Models.js"
import jwt from "jsonwebtoken"

const genrateAccessTokenandRefreshtokens = async (userid) => {
    try {
        const user = await User.findById(userid)
        const accessToken = user.genrateAccessToken()
        const refreshToken = user.genrateRefreshToken()

        user.refreshtoken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {
            accessToken,
            refreshToken,
        }
    } catch (error) {
        throw new console.error("500 Something want wrong in genrate tokens", error)
    }
}

async function handleUserLogin(req, res) {
    const { email, name, password } = req.body;

    if (!name && !email) {
        return res.status(400).json({ "MSG": "Name or Email is required" });
    }

    try {
        const user = await User.findOne({
            $or: [{ name }, { email }]
        });

        if (!user) {
            return res.status(404).json({ "MSG": "User not found" });
        }

        const isPasswordValid = await user.isPasswordCorrect(password);

        if (!isPasswordValid) {
            return res.status(401).json({ "MSG": "Invalid user credentials" });
        }

        const { accessToken, refreshToken } = await genrateAccessTokenandRefreshtokens(user._id);

        const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

        const options = {
            httpOnly: true,
            secure: true
        };

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({
                MSG: "User logged in successfully",
                data: { user: loggedInUser, accessToken, refreshToken }
            });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "MSG": "Server error" });
    }

}
// added a save method in models so when i save password it got increpts
async function handleUserSignUp(req, res) {
    const { name, email, password } = req.body;
    try {
        if (!name?.trim() || !email?.trim() || !password?.trim()) {
            return res.status(400).json({ "msg": "All fields are required" });
        }
    
        const existingUser = await User.findOne({
            $or: [{ name }, { email }]
        });
    
        if (existingUser) {
            return res.status(409).json({ "msg": "Name or Email already exists" });
        }
    
        const user = new User({
            name,
            email,
            password,
        });
    
        await user.save();
    
        const createdUser = await User.findById(user._id).select("-password -refreshToken");
    
        if (!createdUser) {
            return res.status(500).json({ "msg": "Something went wrong while registering user" });
        }
    
        return res.status(201).json({
            msg: "User registered successfully",
            user: createdUser,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "msg": "Server error" });
    }
}

export {
    handleUserSignUp,
    handleUserLogin
}

