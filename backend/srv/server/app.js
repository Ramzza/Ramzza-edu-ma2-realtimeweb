const app = require('express')();
const httpServer = require('http').createServer(app);
const options = {
	cors: {
		origin: 'http://localhost',
		methods: ['GET', 'POST'],
	},
};
const io = require('socket.io')(httpServer, options);
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const logger = require('./logger/logger');
require('dotenv/config');
const Chats = require('./sockets/chats');

logger.info('Starting...', 'general~.~.');

// Middlewares
logger.info('Adding middlewares', 'general~.~.');
app.use(cors());
app.use(bodyParser.json());

// Import Routes
logger.info('Importing Routes', 'general~.~.');
const authRoute = require('./routes/auth');
const usersRoute = require('./routes/users');
const tasksRoute = require('./routes/tasks');

// Route middlewares
logger.info('Adding route middlewares', 'general~.~.');
app.use('/auth', authRoute);
app.use('/users', usersRoute);
app.use('/tasks', tasksRoute);

// Connect to DB
logger.info('Connectiong to DB...', 'general~db~connection');
try {
	mongoose
		.connect(process.env.DB_CONNECTION, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(
			() => {
				logger.info('DB connection successful', 'general~db~connection');
			},
			(err) => {
				logger.error(
					'DB connection failed with promise',
					'general~db~connection'
				);
			}
		);
} catch (err) {
	logger.error('DB connection failed with exception', 'general~db~connection');
}

// How do we start listening to the server
io.on('connection', (socket) => {
	logger.info('socket connected');
	console.log('socket connected');
	Chats.getInstance().addSocket(socket);
});

logger.info('Listening to port 3001...', 'general~network~connection');
console.log('Listening to port 3001...');
httpServer.listen(3001);
// app.listen(3001);
