import jwt from "jsonwebtoken"


const secret = "awda213wdwawd"

function setUser (user){
    return jwt.sign({
        _id : user._id,
        email: user.email
    },secret)
} 

function getUser (token){
    if(!token) return null
    try {
        return jwt.verify(token , secret);
    } catch (error) {
        return null
    }
}

export {
    getUser,
    setUser,
}
