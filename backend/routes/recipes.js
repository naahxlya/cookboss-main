module.exports = router;

const express = require("express");
const router = express.Router();
const controller = require("../controllers/recipeController");

router.get("/", controller.getRecipes);
router.post("/", controller.addRecipe);
router.put("/:id", controller.updateRecipe);
router.delete("/:id", controller.deleteRecipe);

module.exports = router;