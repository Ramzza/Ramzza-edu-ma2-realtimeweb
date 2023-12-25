/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
const logger = require('../logger/logger');
const Chat = require('../models/entity/Chat');
const EmailService = require('../mq/EmailService');

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
    EmailService().sendBitcoin = this.sendBitcoin.bind(this);
  }

  addSocket(socket) {
    socket.on('disconnect', () => {
      const deletedUserName = Object.entries(this.oSockets)
        .find((obj) => obj[1].socket.id === socket.id);

      if (deletedUserName) {
        delete this.oSockets[deletedUserName[0]];
        const onlineUsers = Object.keys(this.oSockets);

        onlineUsers.forEach((username) => {
          this.oSockets[username].socket.emit('onlineUsers', onlineUsers);
        });
        // ...
        console.log('user disconnected');
      }
    });

    socket.on('name', (currentUser) => {
      console.log(currentUser);
      if (!currentUser) {
        return;
      }
      this.oSockets[currentUser] = { socket };

      const onlineUsers = Object.keys(this.oSockets);

      onlineUsers.forEach((username) => {
        this.oSockets[username].socket.emit('onlineUsers', onlineUsers);
      });

      socket.on('getOnlineUsers', () => {
        const aOnlineUsers = Object.keys(this.oSockets);

        aOnlineUsers.forEach((username) => {
          this.oSockets[username].socket.emit('onlineUsers', aOnlineUsers);
        });
      });

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

  async notifyPostsChange(postService) {
    const onlineUsers = Object.keys(this.oSockets);
    const posts = await postService.readPosts();

    onlineUsers.forEach((username) => {
      this.oSockets[username].socket.emit('postsChanged', posts);
    });
  }
}

module.exports = Chats;
