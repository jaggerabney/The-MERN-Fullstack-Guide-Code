const { v4: uuid } = require("uuid");
const { validationResult } = require("express-validator");

const Place = require("../models/place");
const HttpError = require("../models/http-error");
const getCoordinatesFromAddress = require("../util/location");

let DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/800px-Empire_State_Building_%28aerial_view%29.jpg",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.74861523068957,
      lng: -73.98524597764153
    },
    creator: "u1"
  }
];

async function getPlaceById(req, res, next) {
  const { placeId } = req.params;
  let place;

  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError("Couldn't find a place for the given ID!", 404);

    return next(error);
  }

  if (!place) {
    const error = new HttpError("Couldn't find a place for the given ID!", 404);

    return next(error);
  }

  res.json({ place: place.toObject({ getters: true }) });
}

async function getPlacesByUserId(req, res, next) {
  const { userId } = req.params;
  let places;

  try {
    places = await Place.find({ creator: userId });
  } catch (err) {
    const error = new HttpError(
      "Couldn't find places for the given user ID!",
      404
    );

    return next(error);
  }

  if (!places || places.length < 1) {
    const error = new HttpError(
      "Couldn't find places for the given user ID!",
      404
    );

    return next(error);
  }

  res.json({
    places: places.map((place) => place.toObject({ getters: true }))
  });
}

async function createPlace(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);

    return next(new HttpError("Invalid information!", 422));
  }

  const { title, description, address, image, creator } = req.body;
  let coordinates;

  try {
    coordinates = await getCoordinatesFromAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    image,
    creator
  });

  try {
    await createdPlace.save();
  } catch (error) {
    return next(error);
  }

  res.status(201).json({ place: createdPlace });
}

function updatePlaceById(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);

    return next(new HttpError("Invalid information!", 422));
  }

  const { placeId } = req.params;
  const { title, description } = req.body;
  const updatedPlace = {
    ...DUMMY_PLACES.find((place) => place.id === placeId),
    title,
    description
  };
  const placeIndex = DUMMY_PLACES.findIndex((place) => place.id === placeId);

  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ place: updatedPlace });
}

function deletePlaceById(req, res, next) {
  const { placeId } = req.params;

  if (!DUMMY_PLACES.find((place) => place.id === placeId)) {
    throw new HttpError("Couldn't find a place for that ID!", 404);
  }

  DUMMY_PLACES = DUMMY_PLACES.filter((place) => place.id !== placeId);

  res.status(200).json({ message: "Deleted place!" });
}

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlaceById = deletePlaceById;
