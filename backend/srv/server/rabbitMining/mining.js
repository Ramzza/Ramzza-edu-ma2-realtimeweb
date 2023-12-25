#!/usr/bin/env node

const sendQeue = 'mining_queue';
const receiveQeue = 'coin_queue';

class Miner {
	constructor() {
		this.amqp = require('amqplib/callback_api');

		this.amqp.connect('amqp://localhost', (error0, connection) => {
			if (error0) {
				throw error0;
			}

			this.initSender(connection);
			this.initReceiver(connection);
		});
	}

	initReceiver(connection) {
		connection.createChannel((error, channel) => {
			channel.assertQueue(receiveQeue, {
				durable: true,
			});
			channel.prefetch(1);
			this.consumeBitcoin(channel);
		});
	}

	initSender(connection) {
		connection.createChannel((error1, channel) => {
			if (error1) {
				throw error1;
			}

			this.channelSend = channel;

			channel.assertQueue(sendQeue, {
				durable: true,
			});
		});
	}

	orderBitcoin(sUser) {
		this.channelSend.sendToQueue(sendQeue, Buffer.from(sUser), {
			persistent: true,
		});
	}

	consumeBitcoin(channel) {
		channel.consume(
			receiveQeue,
			(msg) => {
				console.log(msg.content.toString());
				let response = msg.content.toString().split('-');
				this.sendBitcoin(response[0], response[1]);
				channel.ack(msg);
			},
			{
				noAck: false,
			}
		);
	}
}

module.exports = Miner;
