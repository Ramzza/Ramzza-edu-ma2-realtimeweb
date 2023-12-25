import React from 'react';
import PropTypes from 'prop-types';
import Toolbar, { Item } from 'devextreme-react/toolbar';
import Button from 'devextreme-react/button';
import { Template } from 'devextreme-react/core/template';
import UserPanel from '../user-panel/user-panel';
import './header.scss';

export default function Header({ menuToggleEnabled, title, toggleMenu }) {
  return (
    <header className="header-component">
      <Toolbar className="header-toolbar">
        <Item
          visible={menuToggleEnabled}
          location="before"
          widget="dxButton"
          cssClass="menu-button"
        >
          <Button icon="menu" stylingMode="text" onClick={toggleMenu} />
        </Item>
        <Item
          location="before"
          cssClass="header-title"
          text={title}
          visible={!!title}
        />
        <Item
          location="after"
          locateInMenu="auto"
          menuItemTemplate="userPanelTemplate"
        >
          <Button
            className="user-button authorization"
            width={210}
            height="100%"
            stylingMode="text"
          >
            <UserPanel menuMode="context" />
          </Button>
        </Item>
        <Template name="userPanelTemplate">
          <UserPanel menuMode="list" />
        </Template>
      </Toolbar>
    </header>
  );
}

Header.propTypes = {
  menuToggleEnabled: PropTypes.bool.isRequired,
  title: PropTypes.string,
  toggleMenu: PropTypes.func.isRequired,
};
Header.defaultProps = {
  title: '',
};
