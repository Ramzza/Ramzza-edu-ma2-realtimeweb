#!/usr/bin/env node
require('dotenv').config();
var amqp = require('amqplib/callback_api');
var nodemailer = require('nodemailer');

const sendQeue = 'coin_queue';
const receiveQeue = 'mining_queue';

var transporter = nodemailer.createTransport({
	host: process.env.SERVER,
	port: 587,
	secure: false, // upgrade later with STARTTLS
    requireTLS: true,

    tls: {
        rejectUnauthorized:false
    },
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASSWORD,
	},
});

var mailOptions = {
	from: process.env.EMAIL_USER,
	to: process.env.EMAIL_RECIPIENT,
	subject: 'Sending Email using Node.js',
	text: 'That was easy!',
};

var mineBitcoin = (channel) => {
	channel.consume(
		receiveQeue,
		(msg) => {
			setTimeout(function () {
				let iBtc = Math.random() / 1000;
				console.log(iBtc);
				channel.sendToQueue(
					sendQeue,
					Buffer.from(msg.content.toString() + '-' + iBtc.toString()),
					{
						persistent: true,
					}
				);
				channel.ack(msg);

				transporter.sendMail(mailOptions, function (error, info) {
					if (error) {
						console.log(error);
					} else {
						console.log('Email sent: ' + info.response);
					}
				});
			}, 10);
		},
		{
			noAck: false,
		}
	);
};

var initReceiver = (connection) => {
	connection.createChannel(function (error, channel) {
		channel.assertQueue(receiveQeue, {
			durable: true,
		});
		channel.prefetch(1);
		mineBitcoin(channel);
	});
};

var initSender = (connection) => {
	connection.createChannel((error1, channel) => {
		if (error1) {
			throw error1;
		}

		channel.assertQueue(sendQeue, {
			durable: true,
		});
	});
};

amqp.connect('amqp://localhost', function (error, connection) {
	initReceiver(connection);
	initSender(connection);
});
