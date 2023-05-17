const { v4: uuid } = require("uuid");

const HttpError = require("../models/http-error");

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/800px-Empire_State_Building_%28aerial_view%29.jpg",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.74861523068957,
      lng: -73.98524597764153,
    },
    creator: "u1",
  },
];

function getPlaceById(req, res, next) {
  const { placeId } = req.params;
  const place = DUMMY_PLACES.find((place) => place.id === placeId);

  if (!place) {
    throw new HttpError("Couldn't find a place for that ID!", 404);
  }

  res.json({ place });
}

function getPlacesByUserId(req, res, next) {
  const { userId } = req.params;
  const places = DUMMY_PLACES.filter((place) => place.creator === userId);

  if (places.length < 1) {
    throw new HttpError("Couldn't find places for the given user ID!", 404);
  }

  res.json({ places });
}

function createPlace(req, res, next) {
  const { title, description, coordinates, address, creator } = req.body;
  const createdPlace = {
    id: uuid(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };

  DUMMY_PLACES.push(createdPlace);

  res.status(201).json({ place: createdPlace });
}

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
