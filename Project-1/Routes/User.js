const express = require("express")

const router = express.Router();

const { 
    handleGetAllUser,
    CreateUser,
    deleteUserByID,
    patchUserByID,
    GetUserByID,
    handleGetAllUserSS,
} = require("../Controllers/User.js")
router.get("/api/users", handleGetAllUser)

router.route("/")
.get(handleGetAllUserSS)
.post(CreateUser)

// dynamic path patameter and route created
router.route("/api/user/:id")
    .get(GetUserByID)
    .patch(patchUserByID)
    .post(patchUserByID)
    .delete(deleteUserByID);

router.post("/newuser", CreateUser);

module.exports = router