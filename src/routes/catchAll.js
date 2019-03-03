const express = require("express");
const router = express.Router();
const catchAllController = require("../controllers/catchAllController.js");

router.get("*", catchAllController.index);

module.exports = router;