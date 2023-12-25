import React, { useState, useEffect } from 'react';
import { List } from 'devextreme-react';
import { PostItem } from '../../components';
import CrudFacade from '../../api/rest-api';
import ChatSocket from '../../utils/chat-socket';

function PostsPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    ChatSocket().setPostsChangedCallback(handlePostsChanged);
    CrudFacade().getPosts((aPosts) => {
      setPosts(aPosts);
    });
  }, []);

  const handlePostsChanged = (aPosts) => {
    setPosts(aPosts);
  };

  const renderItem = (post) => (<PostItem {...post} />);

  return (
    <>
      <PostItem editable />
      <List
        dataSource={posts}
        itemRender={renderItem}
      />
    </>
  );
}

export default PostsPage;
