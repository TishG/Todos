const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/users/sign_up", userController.signUp);
router.get("/users/sign_in", userController.signIn);
router.get("/users/sign_out", userController.signOut);
router.post("/users/sign_in", userController.userSignIn);

module.exports = router;