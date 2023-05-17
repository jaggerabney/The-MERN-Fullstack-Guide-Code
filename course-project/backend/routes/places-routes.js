const express = require("express");

const placesController = require("../controllers/places-controller");

const router = express.Router();

router.get("/:placeId", placesController.getPlaceById);
router.get("/user/:userId", placesController.getPlacesByUserId);
router.post("/", placesController.createPlace);

module.exports = router;
