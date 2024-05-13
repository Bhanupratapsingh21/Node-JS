import { json } from "express";
import { v4 as uuidv4 } from 'uuid'
import {setUser,getUser} from "../Service/auth.js"
import User from "../Models/User.Models.js"
async function handleUserSighup (req , res){
    
    const {name , email , password} = req.body;
    
    await User.create({
        name,email,password,
    });

    return res.status(201).json({msg : "home"});

}
async function handleUserLogin (req , res){
    
    const {name , email , password} = req.body;
    
    const user = await User.findOne({
        email,password
    });
    
    if(!user) return res.status(404).json({
        msg : "Invaild password or username"
    });
    const sessionId = uuidv4();
    setUser(sessionId,user)
    res.cookie("uid" , sessionId)
    return res.status(201).json({msg : "home",...user});
}

export {
    handleUserSighup,
    handleUserLogin
}