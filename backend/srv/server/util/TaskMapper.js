const {
  TaskCompleteDTO,
  defaultValues,
} = require('../models/dto/TaskCompleteDTO');
const { TaskEditableDTO } = require('../models/dto/TaskEditableDTO');

exports.mapCompleteToEntity = (fromBody) => {
  const entity = {};

  Object.keys(TaskCompleteDTO).forEach((prop) => {
    entity[prop] = fromBody[prop];
  });

  Object.entries(defaultValues).forEach(([key, value]) => {
    entity[key] = value;
  });

  return entity;
};

exports.mapEditableToEntity = (fromBody) => {
  const entity = {};

  Object.keys(TaskEditableDTO).forEach((prop) => {
    if (fromBody[prop] !== '' && fromBody[prop] !== null) {
      entity[prop] = fromBody[prop];
    }
  });

  return entity;
};
