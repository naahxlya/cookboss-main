const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");

const controller = require("../controllers/recipeController");

router.get("/", controller.getRecipes);

router.post(
  "/",
  upload.single("imagem"),
  controller.addRecipe
);

router.put(
  "/:id",
  upload.single("imagem"),
  controller.updateRecipe
);

router.delete("/:id", controller.deleteRecipe);

module.exports = router;