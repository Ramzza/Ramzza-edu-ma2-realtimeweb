/* eslint-disable no-underscore-dangle */
import React, {
  useState, useEffect, useRef,
} from 'react';
import PropTypes from 'prop-types';
import { Button, List, TextBox } from 'devextreme-react';

import { useAuth } from '../../contexts/auth';

import './chat-window.scss';
import ChatSocket from '../../utils/chat-socket';

function ChatWindow({ recipient }) {
  const { user } = useAuth();
  const [currentMessage, setCurrentMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const oList = useRef(null);

  useEffect(() => {
    ChatSocket().setOnlineUserChangeCallback(onMessageChange);
    ChatSocket().setMessageChangeCallback(onMessageChange);
  }, []);

  useEffect(() => {
    ChatSocket().selectDestination(recipient);
  }, [recipient]);

  const onMessageChange = () => {
    const messageList = ChatSocket().getExistingMessages();
    oList.current?._instance.option('items', messageList);
    oList.current?._instance.scrollTo(oList.current?._instance.scrollHeight());
    setMessages(messageList);
  };

  const onSend = () => {
    if (currentMessage) {
      ChatSocket().sendMessage(currentMessage);
      setCurrentMessage('');
    }
  };

  const onTextChanged = (oEvent) => {
    setCurrentMessage(oEvent.value);
  };

  const renderListItem = (item) => (
    <div
      className={
        item.user_from === user.username
          ? 'zzAlignRight'
          : 'zzColorReceived'
      }
    >
      {item.message}
    </div>
  );

  return (
    <div className="zzBorder">
      <List
        height="450px"
        items={messages}
        itemRender={renderListItem}
        ref={oList}
        pageLoadMode="scrollBottom"
        scrollByContent
      />
      <div className="zzRowContainer">
        <TextBox
          onValueChanged={onTextChanged}
          value={currentMessage}
          onEnterKey={onSend}
        />
        <Button onClick={onSend} text="OK" />
      </div>
    </div>
  );
}

ChatWindow.propTypes = { recipient: PropTypes.string };
ChatWindow.defaultProps = { recipient: '' };

export default ChatWindow;
