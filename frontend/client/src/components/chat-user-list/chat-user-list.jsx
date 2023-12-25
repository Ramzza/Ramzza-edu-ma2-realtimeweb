import React, { useEffect, useState } from 'react';
import List from 'devextreme-react/list';
import './chat-user-list.scss';
import { ChatWindow } from '..';

function ChatUserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers([
      // {
      //   firstName: 'Janos',
      //   lastName: 'Kis',
      //   status: 1,
      // },
    ]);
  }, []);


  const renderListItem = (item) => (
    <div className="name" >
      {item.status}
      {' '}
      {item.firstName}
      {' '}
      {item.lastName}
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
      <ChatWindow />
    </div>
  );
}

export default ChatUserList;
