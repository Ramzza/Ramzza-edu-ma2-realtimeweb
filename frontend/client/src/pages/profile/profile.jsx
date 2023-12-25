import React, { useEffect, useState } from 'react';
import { Form } from 'devextreme-react';

import { useAuth } from '../../contexts/auth';
import CrudFacade from '../../api/rest-api';
import './profile.scss';

const aNotVisibleFields = [
  '_id',
  'car',
  'pc',
  '__v',
  'password',
  'date_end',
  'cnp',
  'username',
  'comments',
  'date_started',
];
const aDisabledFields = ['cnp', 'username'];

function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [localUser, setLocalUser] = useState(user);

  useEffect(() => {
    setLocalUser(user);
  }, [user.username]);

  const customizeItem = (item) => {
    const formItem = item;

    if (aNotVisibleFields.indexOf(formItem.dataField) !== -1) {
      formItem.visible = false;
    }

    if (aDisabledFields.indexOf(formItem.dataField) !== -1) {
      formItem.disabled = true;
    }
  };

  const onFieldDataChanged = () => {
    CrudFacade().patchUser(localUser, () => {
      updateUser(localUser);
    });
  };

  return (
    <>
      <h2 className="content-block">Profile</h2>

      <div className="content-block dx-card responsive-paddings">
        <div className="form-avatar">
          <img
            alt=""
            src={`https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/${user.Picture}`}
          />
        </div>
        <div>{localUser.username}</div>
        <div>{localUser.cnp}</div>
      </div>

      <div className="content-block dx-card responsive-paddings">
        <Form
          id="form"
          formData={localUser}
          onFieldDataChanged={onFieldDataChanged}
          labelLocation="top"
          colCountByScreen={colCountByScreen}
          customizeItem={customizeItem}
        />
      </div>
    </>
  );
}

const colCountByScreen = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4,
};

export default ProfilePage;
