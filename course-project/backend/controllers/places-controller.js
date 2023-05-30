const fs = require("fs");

const mongoose = require("mongoose");
const { validationResult } = require("express-validator");

const Place = require("../models/place");
const User = require("../models/user");
const error = require("../models/http-error");
const getCoordinatesFromAddress = require("../util/location");

async function getPlaceById(req, res, next) {
  const { placeId } = req.params;
  let place;

  try {
    place = await Place.findById(placeId);
  } catch (err) {
    return next(error("Couldn't find a place for the given ID!", 404));
  }

  if (!place) {
    return next(error("Couldn't find a place for the given ID!", 404));
  }

  res.json({ place: place.toObject({ getters: true }) });
}

async function getPlacesByUserId(req, res, next) {
  const { userId } = req.params;
  let places;

  try {
    const user = await User.findById(userId).populate("places");

    places = user.places;
  } catch (err) {
    return next(error("Couldn't fetch places for the given user ID!", 404));
  }

  if (!places) {
    return next(error("Couldn't fetch places for the given user ID!", 404));
  }

  res.json({
    places: places.map((place) => place.toObject({ getters: true })),
  });
}

async function createPlace(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(error("Invalid information!", 422));
  }

  const { title, description, address } = req.body;
  let coordinates, user;

  try {
    coordinates = await getCoordinatesFromAddress(address);
  } catch (err) {
    console.log(err);

    return next(error("The entered address is not a valid address!", 406));
  }

  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    image: req.file.path,
    creator: req.user.userId,
  });

  try {
    user = await User.findById(req.user.userId);
  } catch (err) {
    return next(error("Place creation failed!", 500));
  }

  if (!user) {
    return next(error("Couldn't find user for provided ID!", 404));
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    await createdPlace.save({ session });

    user.places.push(createdPlace);
    await user.save({ session });

    await session.commitTransaction();
  } catch (err) {
    return next(error("Couldn't write data to database!", 500));
  }

  res.status(201).json({ place: createdPlace });
}

async function updatePlaceById(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(error("Invalid information!", 422));
  }

  const { placeId } = req.params;
  const { title, description } = req.body;
  let place;

  try {
    place = await Place.findById(placeId);
  } catch (err) {
    return next(error("Couldn't find place!", 500));
  }

  if (place.creator.toString() !== req.user.userId) {
    return next(error("You can't edit places that don't belong to you!", 401));
  }

  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (err) {
    return next(error(("Couldn't save place!", 500)));
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
}

async function deletePlaceById(req, res, next) {
  const { placeId } = req.params;
  let place;

  try {
    place = await Place.findById(placeId).populate("creator");
  } catch (err) {
    return next(error(("Couldn't find place for the given ID!", 500)));
  }

  if (!place) {
    return next(error(("Couldn't find place for the given ID!", 500)));
  }

  if (place.creator.id !== req.user.userId) {
    return next(
      error("You can't delete places that don't belong to you!", 401)
    );
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    await place.deleteOne({ session });

    place.creator.places.pull(place);
    await place.creator.save({ session });

    await session.commitTransaction();
  } catch (err) {
    return next(error(("Couldn't remove place!", 500)));
  }

  fs.unlink(place.image, (error) => console.log(error));

  res.status(200).json({ message: "Deleted place!" });
}

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlaceById = deletePlaceById;
