/* eslint-disable class-methods-use-this */
import { io } from 'socket.io-client';
import CurrentUser from './current-user';

const socket = io();

class ChatSocket {
  static getInstance() {
    if (!ChatSocket.instance) {
      ChatSocket.instance = new ChatSocket();
    }
    return ChatSocket.instance;
  }

  constructor() {
    this.userTo = '';
    this.oMessages = {};
  }

  getConversationName() {
    return CurrentUser().username < this.userTo
      ? CurrentUser().username + this.userTo
      : this.userTo + CurrentUser().username;
  }

  getExistingMessages() {
    return this.oMessages[this.getConversationName()];
  }

  registerUserToChat(sUser) {
    socket.emit('name', sUser);
  }

  selectDestination(sUser) {
    this.userTo = sUser;

    if (!this.oMessages[this.getConversationName()]) {
      socket.emit('getChat', this.userTo);
      this.oMessages[this.getConversationName()] = [];
    }
    this.fnMessageChangeCallback();
  }

  requestOnlineUsers(sUser) {
    socket.emit('getOnlineUsers', sUser.username);
  }

  sendMessage(sMessage) {
    this.oMessages[this.getConversationName()].push({
      user_from: CurrentUser().username,
      message: sMessage,
    });
    socket.emit('chat', { username: this.userTo, message: sMessage });
    this.fnMessageChangeCallback();
  }

  orderBitcoin() {
    socket.emit('mine', CurrentUser().email);
  }

  setOnlineUserChangeCallback(fnCallback) {
    socket.on('onlineUsers', (data) => {
      fnCallback(data);
    });
  }

  setPostsChangedCallback(fnCallback) {
    socket.on('postsChanged', (data) => {
      fnCallback(data);
    });
  }

  setMessageChangeCallback(fnCallback) {
    this.fnMessageChangeCallback = fnCallback;

    socket.on('chat', (data) => {
      this.oMessages[data.conversation].push(data);
      this.fnMessageChangeCallback();
    });

    socket.on('getChat', (data) => {
      this.oMessages[this.getConversationName()] = data;
      this.fnMessageChangeCallback();
    });
  }

  setCoinReadyCallback(fnCallback) {
    socket.on('coin', (data) => {
      fnCallback(data);
    });
  }
}

export default ChatSocket.getInstance;
