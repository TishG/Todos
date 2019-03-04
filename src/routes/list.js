const express = require("express");
const router = express.Router();
const listController = require("../controllers/listController");

router.get("/list", listController.index);
router.post("/list/newItem", listController.list);
router.post("/list/:id/purchased", listController.post)

// router.get("*", todosController.catchAll);

module.exports = router;