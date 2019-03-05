const express = require("express");
const router = express.Router();
const listController = require("../controllers/listController");

router.get("/list", listController.index);
router.post("/list/newItem", listController.list);
router.post("/list/:id/purchased", listController.update);
router.post("/list/:id/delete", listController.delete);

// router.get("*", todosController.catchAll);

module.exports = router;