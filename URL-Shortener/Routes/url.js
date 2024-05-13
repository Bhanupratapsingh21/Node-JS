import express from "express";
import { 
    generateNewUrl,
    handleRedirect,
    handlegetanalytics
 } from "../Controllers/url.js";
import url from "../Models/Models.js"
import restrictToLoggedInUserOnly from "../Middleware/auth.js";

const router = express.Router();

router.post("/url", restrictToLoggedInUserOnly,generateNewUrl);
router.get("/:shortId",handleRedirect);
router.get("/analytics/:shortId",handlegetanalytics);

export default router