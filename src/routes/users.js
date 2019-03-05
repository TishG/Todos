const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const validation = require("./validation");

router.post("/users/sign_up", userController.signUp, validation.validateUsers);
router.get("/users/sign_in", userController.signIn);
router.get("/users/sign_out", userController.signOut);
router.post("/users/sign_in", userController.userSignIn);

module.exports = router;