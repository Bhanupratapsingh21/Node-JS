import express from "express"
import {handleUserLogin,handleUserSignUp} from "../Controllers/User-controllers.js"

const router = express.Router();

router.post("/sign-up",handleUserSignUp);
router.post("/login",handleUserLogin);

export default router