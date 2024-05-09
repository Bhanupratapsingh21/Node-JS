import {nanoid} from "nanoid";
import url from "../Models/Models.js";

async function generateNewUrl(req,res){
    const shortID = nanoid(8);
    const body = req.body;
    if(!body.url){
        return res
        .status(400)
        .json({"msg" : "URL IS REQUIRED"})
    }
    
    await url.create({
        shortId : shortID,
        redirectURL : body.url,
        visitHistory : [],
    });
}

export {
    generateNewUrl
}