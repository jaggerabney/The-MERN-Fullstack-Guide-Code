const express = require("express");
const { check } = require("express-validator");

const placesController = require("../controllers/places-controller");
const fileUpload = require("../middleware/file-upload");
const isAuth = require("../middleware/auth");

const router = express.Router();

// public routes
router.get("/:placeId", placesController.getPlaceById);
router.get("/user/:userId", placesController.getPlacesByUserId);

// auth middleware
router.use(isAuth);

// protected routes
router.post(
  "/",
  fileUpload.single("image"),
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  placesController.createPlace
);
router.patch(
  "/:placeId",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  placesController.updatePlaceById
);
router.delete("/:placeId", placesController.deletePlaceById);

module.exports = router;
