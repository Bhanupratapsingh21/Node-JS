import express from "express";
import { generateNewUrl } from "../Controllers/url.js";

const router = express.Router();

router.post("/url", generateNewUrl)
router.get("/url",(req,res)=>{
    res.json({msg: "connetc"})
})

export default router