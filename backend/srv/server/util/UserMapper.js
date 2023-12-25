const { UserCompleteDTO } = require('../models/dto/UserCompleteDTO');
const { UserEditableDTO } = require('../models/dto/UserEditableDTO');

exports.mapCompleteToEntity = (fromBody) => {
  const entity = {};

  Object.entries(UserCompleteDTO).forEach(([key, value]) => {
    entity[key] = value;
  });

  Object.keys(UserCompleteDTO).forEach((prop) => {
    entity[prop] = fromBody[prop];
  });

  return entity;
};

exports.mapEditableToEntity = (fromBody) => {
  const entity = {};

  Object.keys(UserEditableDTO).forEach((prop) => {
    entity[prop] = fromBody[prop];
  });

  return entity;
};
