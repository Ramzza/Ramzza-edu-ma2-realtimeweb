const logger = require('../logger/logger');
const User = require('../models/entity/User');
const { mapEditableToEntity } = require('../util/UserMapper');

class UserService {
  async readUsers() {
    try {
      logger.info('User GET-all called', 'crud~user~get-all');
      const users = await User.find();
      logger.info(
        `User GET-all successful: ${users.length}`,
        'crud~user~get-all',
      );
      return users;
    } catch (err) {
      logger.error(
        `User GET-all failed: ${err.toString()}`,
        'crud~user~get-all',
      );
      throw Error('Users read failed!');
    }
  }

  async readUserById(userId) {
    try {
      logger.info('User GET-single called', 'crud~user~get-single');
      const user = await User.findById(userId);
      logger.info('User GET-single successful', 'crud~user~get-single');
      return user;
    } catch (err) {
      logger.error('User GET-single failed', 'crud~user~get-single');
      throw Error('User read failed!');
    }
  }

  async readUserByUsername(username) {
    try {
      logger.info(
        'User GET-single by username called',
        'crud~user~get-single-username',
      );
      const user = await User.findOne({ username });
      logger.info(
        'User GET-single by username successful',
        'crud~user~get-single-username',
      );
      return user;
    } catch (err) {
      logger.error(
        'User GET-single by username failed',
        'crud~user~get-single-username',
      );
      throw Error('User read by username failed!');
    }
  }

  async updateUser(userId, payload) {
    logger.info('User PATCH called', 'crud~user~patch');
    try {
      const updatedUser = await User.updateOne(
        { _id: userId },
        {
          $set: mapEditableToEntity(payload),
        },
      );
      logger.info('User PATCH successful', 'crud~user~patch');

      return updatedUser;
    } catch (err) {
      logger.error('User PATCH failed', 'crud~user~patch');
      throw Error('User update failed!');
    }
  }

  async deleteUser(userId) {
    try {
      logger.info('User DELETE called', 'crud~user~delete');
      const deletedUser = await User.deleteOne({ _id: userId });
      logger.info('User DELETE successful', 'crud~user~delete');

      return deletedUser;
    } catch (err) {
      logger.error('User DELETE failed', 'crud~user~delete');
      throw Error('User deletion failed!');
    }
  }
}

module.exports = UserService;
