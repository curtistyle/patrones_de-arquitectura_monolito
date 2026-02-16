const express = require("express");
const router = express.Router();
const productController = require("../controllers/productsController");

//todo: CRUD

router.get("/", productController.getAll);

router.post("/add", productController.create);

router.get("/details/:id", productController.details);

router.post("/update/:id", productController.update);

router.post("/delete/:id", productController.delete);

module.exports = router;