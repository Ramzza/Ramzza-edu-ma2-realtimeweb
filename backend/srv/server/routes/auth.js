const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/entity/User');
const logger = require('../logger/logger');
const { mapCompleteToEntity } = require('../util/UserMapper');

router.post('/register', async (req, res) => {
  logger.info('User AUTH-register called', 'crud~auth~register');

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  const userEntity = mapCompleteToEntity(req.body);
  userEntity.password = hashPassword;

  const user = new User(userEntity);

  try {
    const savedUser = await user.save();
    logger.info('User AUTH-register successful', 'crud~auth~register');
    res.json(savedUser);
  } catch (err) {
    logger.error('User AUTH-register failed', 'crud~auth~register');
    res.json({ message: err });
  }
});

router.post('/login', async (req, res) => {
  logger.info('User AUTH-login called', 'crud~auth~login');
  let oUser;
  try {
    oUser = await User.findOne({ username: req.body.username });
  } catch (err) {
    logger.error(err, 'crud~auth~login');
    return res
      .status(400)
      .send(JSON.stringify({ message: 'Wrong credentials' }));
  }
  if (!oUser) {
    logger.error('User AUTH-login failed', 'crud~auth~login');
    return res
      .status(400)
      .send(JSON.stringify({ message: 'Wrong credentials' }));
  }

  const validPass = await bcrypt.compare(req.body.password, oUser.password);
  if (!validPass) {
    logger.error('User AUTH-login failed', 'crud~auth~login');
    return res
      .status(400)
      .send(JSON.stringify({ message: 'Wrong credentials' }));
  }
  logger.info('User AUTH-login successful', 'crud~auth~login');

  oUser.password = null;
  return res.send(JSON.stringify(oUser));
});

module.exports = router;
