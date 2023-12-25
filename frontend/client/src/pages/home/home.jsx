import React, { useState, useEffect } from 'react';
import Form from 'devextreme-react/form';

import { useAuth } from '../../contexts/auth';

import CrudFacade from '../../api/rest-api';
import './home.scss';


const aNotVisibleFields = [
  'uuid',
  'password',
];
const aDisabledFields = ['id', 'username', 'firstName', 'lastName', 'address', 'email', 'phoneNumber', 'type'];

function HomePage() {
  const { user, updateUser, homeUser } = useAuth();
  const [localUser, setLocalUser] = useState(homeUser);

  useEffect(() => {
    setLocalUser(homeUser);
  }, [homeUser.username]);

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
    CrudFacade().patchUser(localUser, (oData) => {
      updateUser(oData);
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
export default HomePage;
