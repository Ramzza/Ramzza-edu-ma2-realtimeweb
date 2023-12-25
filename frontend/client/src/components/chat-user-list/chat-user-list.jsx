import React, { useEffect, useState } from 'react';
import { List } from 'devextreme-react';
import './chat-user-list.scss';
import ChatWindow from '../chat-window/chat-window';
import { useAuth } from '../../contexts/auth';
import ChatSocket from '../../utils/chat-socket';

function ChatUserList() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [currentRecipient, setCurrentRecipient] = useState();

  useEffect(() => {
    ChatSocket().setOnlineUserChangeCallback(onOnlineUserChange);
    ChatSocket().requestOnlineUsers(user);
  }, []);

  const onOnlineUserChange = (aOnlineUsers) => {
    const aUsers = aOnlineUsers.filter((u) => u !== user.username);
    setUsers(aUsers);
  };

  const renderListItem = (item) => (
    <div
      className={
        item.toString() === currentRecipient
          ? 'zzColorReceived' : 'zzAlignRight '
      }
      onClick={() => { setCurrentRecipient(item); }}
      onKeyDown={() => { setCurrentRecipient(item); }}
      role="button"
      tabIndex={0}
    >
      {' '}
      {item.toString()}
    </div>
  );

  return (
    <div className="zzChatWidth">
      <List
        dataSource={users}
        itemRender={renderListItem}
        height="300px"
        searchEnabled
      />
      <ChatWindow recipient={currentRecipient} />
    </div>
  );
}

export default ChatUserList;
