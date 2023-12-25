const logger = require('../logger/logger');
const Task = require('../models/entity/Task');
const {
  mapCompleteToEntity,
  mapEditableToEntity,
} = require('../util/TaskMapper');
const UserService = require('./UserService');
const EmailService = require('../mq/EmailService');

const UserServiceInstance = new UserService();

class TaskService {
  async createTask(task) {
    try {
      logger.info('Task POST called', 'crud~task~post');
      const taskEntity = new Task(mapCompleteToEntity(task));

      const savedTask = await taskEntity.save();
      logger.info('Task POST successful', 'crud~task~post');

      return savedTask;
    } catch (err) {
      logger.error('Task POST failed', 'crud~task~post');
      throw new Error('Task creation failed!');
    }
  }

  async readTasksByUser(username) {
    try {
      logger.info('Task GET-per-user called', 'crud~task~get-per-user');
      const tasksOwn = await Task.find({ owner: username });
      const tasksCreated = await Task.find({ created_by: username });
      logger.info('Task GET-per-user successful', 'crud~task~get-per-user');

      const diffToAdd = tasksCreated.filter((task) => task.owner !== task.created_by);

      return tasksOwn.concat(diffToAdd);
    } catch (err) {
      logger.error('Task GET-per-user failed', 'crud~task~get-per-user');
      throw new Error('Task read failed!');
    }
  }

  async readTaskById(taskId) {
    try {
      logger.info('Task GET-single called', 'crud~task~get-single');
      const task = await Task.findById(taskId);
      logger.info('Task GET-single successful', 'crud~task~get-single');
      return task;
    } catch (err) {
      logger.error('Task GET-single failed', 'crud~task~get-single');
      throw Error('Task read failed!');
    }
  }

  async updateTask(taskId, payload) {
    logger.info('Task PATCH called', 'crud~task~patch');
    try {
      let updatedTask;
      try {
        updatedTask = await this.readTaskById(taskId);
      } catch (err) {
        // do nothing
      }
      if (updatedTask) {
        updatedTask = await Task.updateOne(
          { _id: taskId },
          {
            $set: mapEditableToEntity(payload),
          },
          { new: true },
        );
        logger.info('Task PATCH successful', 'crud~task~patch');

        if (payload.owner !== payload.created_by) {
          await this.notifyUser(
            payload.owner,
            payload.title,
            payload.description,
          );
        }
      } else {
        updatedTask = this.createTask(payload);
      }

      return updatedTask;
    } catch (err) {
      logger.error('Task PATCH failed', 'crud~task~patch');
      throw new Error('Task update failed!');
    }
  }

  async deleteTask(taskId) {
    try {
      logger.info('Task DELETE called', 'crud~task~delete');
      const deletedTask = await Task.deleteOne({ _id: taskId });
      logger.info('Task DELETE successful', 'crud~task~delete');

      return deletedTask;
    } catch (err) {
      logger.error('Task DELETE failed', 'crud~task~delete');
      throw new Error('Task deletion failed!');
    }
  }

  async notifyUser(username, taskName, taskDescription) {
    const user = await UserServiceInstance.readUserByUsername(username);
    EmailService().sendEmail(`${user.email}:${taskName}:${taskDescription}`);
  }
}

module.exports = TaskService;
