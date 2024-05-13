import express from "express"
import {handleUserSighup , handleUserLogin} from "../Controllers/User.controller.js"

const router = express.Router();

router.post("/Signup" , handleUserSighup )
router.post("/Login" , handleUserLogin)

export default router