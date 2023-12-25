/* eslint-disable camelcase */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'devextreme-react';
import { useAuth } from '../../contexts/auth';
import CrudFacade from '../../api/rest-api';

function PostItem({
  _id, editable, title, created_by, created_at, body,
}) {
  const { user } = useAuth();
  const [currentPost, setCurrentPost] = useState({ title: '', body: '' });

  const handleAddPost = () => {
    const newPost = { ...currentPost, created_by: user.username };
    CrudFacade().postPost(newPost, () => {
    });

    setCurrentPost({
      title: '', body: '',
    });
  };

  const handleDeletePost = () => {
    // eslint-disable-next-line no-underscore-dangle
    CrudFacade().deletePost(_id, () => {
    });
  };

  return (
    editable
      ? (
        <div style={{ width: '80%', display: 'flex', alignItems: 'center' }}>

          <Form
            id="form"
            formData={currentPost}
            labelLocation="top"
          />
          <Button text="Send" onClick={handleAddPost} />
        </div>
      )
      : (
        <div>
          <div>
            <div className="title">
              {title}
              {(created_by === user.username)
              && <Button icon="remove" onClick={handleDeletePost} />}
            </div>
            <div className="description">
              {created_by}
              {' '}
              -
              {' '}
              {created_at}
            </div>
          </div>
          {body}
        </div>
      )
  );
}

PostItem.propTypes = {
  _id: PropTypes.string,
  title: PropTypes.string,
  created_by: PropTypes.string,
  created_at: PropTypes.string,
  editable: PropTypes.bool,
  body: PropTypes.string,
};
PostItem.defaultProps = {
  _id: '',
  title: '',
  created_by: '',
  created_at: '',
  body: '',
  editable: false,
};

export default PostItem;
