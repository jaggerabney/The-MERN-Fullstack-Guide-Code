const express = require("express");

const keysController = require("../controllers/keys-controller");

const router = express.Router();

router.get("/google-maps", keysController.getGoogleMapsAPIKey);

module.exports = router;
