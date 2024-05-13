import { getUser } from "../Service/auth.js";
async function restrictToLoggedInUserOnly (req,res,next){
    const userUid = req.cookies?.uid;
    console.log(req)
    if(!userUid) return res.status(404).json({msg:"please login"})
    
    const user = getUser(userUid);

    if(!user) return res.status(404).json({msg:"user not found"})

    req.user = user;
    next();
}

export default restrictToLoggedInUserOnly
