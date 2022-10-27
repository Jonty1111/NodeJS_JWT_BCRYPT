const { Router } = require("express")
const express = require("express")



const router = express.Router()



const controller =require("../Controller/user-controller")

//API path


router.post("/singup",controller.signUp)

router.post("/login",controller.login)


router.get("/allUsers",controller.getAllUser)

module.exports=router
