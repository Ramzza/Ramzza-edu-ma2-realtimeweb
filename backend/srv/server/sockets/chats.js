const logger = require('../logger/logger');
const Chat = require('../models/Chat');
const Miner = require('../rabbitMining/mining');

class Chats {
	static instance = Chats.instance || new Chats();

	static getInstance() {
		if (!Chats.instance) {
			Chats.instance = new Chats();
		}
		return Chats.instance;
	}

	constructor() {
		this.oSockets = {};
		this.oMiner = new Miner();
		this.oMiner.sendBitcoin = this.sendBitcoin.bind(this);
	}

	addSocket(socket) {
		socket.on('name', (currentUser) => {
			console.log(currentUser);
			if (!currentUser) {
				return;
			}
			this.oSockets[currentUser] = { socket: socket };

			socket.on('chat', (msg) => {
				console.log(msg);
				if (!msg || !msg.message) {
					return;
				}
				const chat = new Chat({
					timestamp: Date.now(),
					conversation: this.getConversationName(currentUser, msg.username),
					user_from: currentUser,
					user_to: msg.username,
					message: msg.message,
				});
				if (this.oSockets[msg.username]) {
					this.oSockets[msg.username].socket.emit('chat', chat);
				}
				this.persistChat(chat);
			});

			socket.on('getChat', async (sUserTo) => {
				console.log(sUserTo);
				try {
					if (!currentUser || !sUserTo) {
						return;
					}
					const chats = await Chat.find({
						conversation: this.getConversationName(currentUser, sUserTo),
					});
					socket.emit('getChat', chats);
				} catch (err) {
					console.log(err);
				}
			});

			socket.on('mine', (sUser) => {
				this.oMiner.orderBitcoin(sUser);
			});
		});
	}

	getConversationName(userFrom, userTo) {
		return userFrom < userTo ? userFrom + userTo : userTo + userFrom;
	}

	async persistChat(chat) {
		try {
			await chat.save();
			logger.info('Chat POST successful', 'crud~chat~post');
		} catch (err) {
			logger.error('Chat POST failed', 'crud~chat~post');
		}
	}

	sendBitcoin(sUser, sValue) {
		if (this.oSockets[sUser]) {
			this.oSockets[sUser].socket.emit('coin', sValue);
		}
	}
}

module.exports = Chats;
