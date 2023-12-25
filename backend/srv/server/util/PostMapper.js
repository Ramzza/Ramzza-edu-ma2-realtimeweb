const {
  PostCompleteDTO,
  defaultValues,
} = require('../models/dto/PostCompleteDTO');

exports.mapCompleteToEntity = (fromBody) => {
  const entity = {};

  Object.keys(PostCompleteDTO).forEach((prop) => {
    entity[prop] = fromBody[prop];
  });

  Object.entries(defaultValues).forEach(([key, value]) => {
    entity[key] = value;
  });

  return entity;
};
