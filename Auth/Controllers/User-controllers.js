async function handleUserLogin (req,res){
    res.json({msg:"login"})
}

async function handleUserSignUp (req,res){
    res.json({msg:"Sign-Up"})
}

export {
    handleUserSignUp,
    handleUserLogin
}