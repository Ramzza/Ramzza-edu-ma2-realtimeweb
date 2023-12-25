import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import List from 'devextreme-react/list';
import TextBox from 'devextreme-react/text-box';
import Button from 'devextreme-react/button';

import { useAuth } from '../../contexts/auth';
import CrudFacade from '../../api/rest-api';

import './chat-window.scss';

let userCache = [];

function ChatWindow() {
  const { user, setHomeUser, homeUser } = useAuth();
  const [currentMessage, setCurrentMessage] = useState('asdf');
  const oList = useRef(null);

  let messages = [];

  useEffect(() => {
    // ChatSocket().setMessageChangeCallback(onMessageChange);
    // ChatSocket().initCallbacks(user.username);
    // ChatSocket().selectDestination(user.username === 'test' ? 'test1' : 'test');
    CrudFacade().getAllUsers(onMessageChange);
  }, [user, homeUser.username]);

  const onMessageChange = (aUsers) => {
    // messages = ChatSocket().getExistingMessages();
    // eslint-disable-next-line no-underscore-dangle
    userCache = aUsers;
    oList.current?._instance.option('items', userCache);
  };

  const onSend = () => {
    // ChatSocket().sendMessage(currentMessage);
  };

  const onTextChanged = (oEvent) => {
    setCurrentMessage(oEvent.value);
  };


  const handleItemClick = (e) => {
    let userTest = e.currentTarget.getInnerHTML()
    CrudFacade().findUserById(userTest.split(' - ')[1], handleUserFound);
  }

  const handleUserFound = (user) => {
    setHomeUser(user);
  }

  const renderListItem = (item) => (
    <div
      className={
        item.user_from === user.username
          ? 'zzAlignRight'
          : 'zzColorReceived'
      }
      onClick={handleItemClick}
    >
      {item.username} - {item.id}
    </div>
  );

  return (
    <div>
      <List
        dataSource={userCache}
        height="450px"
        itemRender={renderListItem}
        ref={oList}
      />
      <div className="zzRowContainer">
        <TextBox onValueChanged={onTextChanged} />
        <Button onClick={onSend} />
      </div>
    </div>
  );
}

export default ChatWindow;
