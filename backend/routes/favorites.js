const express =
  require("express");

const router =
  express.Router();

const controller =
  require("../controllers/favoriteController");

router.get(
  "/",
  controller.getFavorites
);

router.get(
  "/check",
  controller.checkFavorite
);

router.post(
  "/",
  controller.addFavorite
);

router.delete(
  "/",
  controller.removeFavorite
);

module.exports =
  router;