const mongoose = require("mongoose");
const { validationResult } = require("express-validator");

const Place = require("../models/place");
const User = require("../models/user");
const HttpError = require("../models/http-error");
const getCoordinatesFromAddress = require("../util/location");

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
    const error = new HttpError("Invalid information!", 422);

    return next(error);
  }

  const { title, description, address, image, creator } = req.body;
  let coordinates, user;

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
    user = await User.findById(creator);
  } catch (err) {
    const error = new HttpError("Place creation failed!", 500);

    return next(error);
  }

  if (!user) {
    const error = new HttpError("Couldn't find user for provided ID!", 404);

    return next(error);
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    await createdPlace.save({ session });

    user.places.push(createdPlace);
    await user.save({ session });

    await session.commitTransaction();
  } catch (error) {
    return next(error);
  }

  res.status(201).json({ place: createdPlace });
}

async function updatePlaceById(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);

    return next(new HttpError("Invalid information!", 422));
  }

  const { placeId } = req.params;
  const { title, description } = req.body;
  let place;

  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError("Couldn't find place!", 500);

    return next(error);
  }

  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (err) {
    const error = new HttpError("Couldn't save place!", 500);

    return next(error);
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
}

async function deletePlaceById(req, res, next) {
  const { placeId } = req.params;
  let place;

  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError("Couldn't find place!", 500);

    return next(error);
  }

  console.log(place);

  try {
    await place.deleteOne();
  } catch (err) {
    const error = new HttpError("Couldn't remove place!", 500);

    return next(error);
  }

  res.status(200).json({ message: "Deleted place!" });
}

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlaceById = deletePlaceById;
