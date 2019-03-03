const express = require("express");
const router = express.Router();
const listController = require("../controllers/listController");

router.get("/list", listController.index);
router.post("/list/newItem", listController.list);


// router.get("*", todosController.catchAll);

module.exports = router;