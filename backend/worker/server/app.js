#!/usr/bin/env node
/* eslint-disable no-console */
require('dotenv').config();
const amqp = require('amqplib/callback_api');
const nodemailer = require('nodemailer');

const sendQeue = 'coin_queue';
const receiveQeue = 'mining_queue';

const transporter = nodemailer.createTransport({
  host: process.env.SERVER,
  port: 587,
  secure: false, // upgrade later with STARTTLS
  requireTLS: true,

  tls: {
    rejectUnauthorized: false,
  },
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const mailOptions = {
  from: process.env.EMAIL_USER,
  to: process.env.EMAIL_RECIPIENT,
  subject: 'Sending Email using Node.js',
  text: 'That was easy!',
};

const sendEmail = (channel) => {
  channel.consume(
    receiveQeue,
    (msg) => {
      setTimeout(() => {
        channel.sendToQueue(sendQeue, Buffer.from(msg.content.toString()), {
          persistent: true,
        });
        channel.ack(msg);

        const msgToTitleBody = msg.content.toString().split(':');
        [mailOptions.to, mailOptions.subject, mailOptions.text] = msgToTitleBody;

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log(`Email sent: ${info.response}`);
          }
        });
      }, 10);
    },
    {
      noAck: false,
    },
  );
};

const initReceiver = (connection) => {
  connection.createChannel((error, channel) => {
    channel.assertQueue(receiveQeue, {
      durable: true,
    });
    channel.prefetch(1);
    sendEmail(channel);
  });
};

const initSender = (connection) => {
  connection.createChannel((error1, channel) => {
    if (error1) {
      throw error1;
    }

    channel.assertQueue(sendQeue, {
      durable: true,
    });
  });
};

amqp.connect('amqp://localhost', (error, connection) => {
  initReceiver(connection);
  initSender(connection);
});
