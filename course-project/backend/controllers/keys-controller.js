require("dotenv").config();

function getGoogleMapsAPIKey(req, res, next) {
  const googleMapsAPIKey = process.env.GOOGLE_MAPS_API_KEY;

  res.status(200).json({ key: googleMapsAPIKey });
}

exports.getGoogleMapsAPIKey = getGoogleMapsAPIKey;
