import React, { useState, useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Drawer from 'devextreme-react/drawer';
import ScrollView from 'devextreme-react/scroll-view';
import { Template } from 'devextreme-react/core/template';
import './side-nav-outer-toolbar.scss';
import { Header, SideNavigationMenu } from '../../components';
import { useScreenSize } from '../../utils/media-query';
import useMenuPatch from '../../utils/patches';

// eslint-disable-next-line react/prop-types
export default function SideNavOuterToolbar({ title, children }) {
  const scrollViewRef = useRef();
  const history = useHistory();
  const { isXSmall, isLarge } = useScreenSize();
  const [patchCssClass, onMenuReady] = useMenuPatch();
  const [menuStatus, setMenuStatus] = useState(
    isLarge ? MenuStatus.Opened : MenuStatus.Closed,
  );

  const toggleMenu = useCallback(({ event }) => {
    setMenuStatus(
      (prevMenuStatus) => (prevMenuStatus === MenuStatus.Closed
        ? MenuStatus.Opened
        : MenuStatus.Closed),
    );
    event.stopPropagation();
  }, []);

  const temporaryOpenMenu = useCallback(() => {
    setMenuStatus(
      (prevMenuStatus) => (prevMenuStatus === MenuStatus.Closed
        ? MenuStatus.TemporaryOpened
        : prevMenuStatus),
    );
  }, []);

  const onOutsideClick = useCallback(() => {
    setMenuStatus(
      (prevMenuStatus) => (prevMenuStatus !== MenuStatus.Closed && !isLarge
        ? MenuStatus.Closed
        : prevMenuStatus),
    );
  }, [isLarge]);

  const onNavigationChanged = useCallback(({ itemData: { path }, event, node }) => {
    if (menuStatus === MenuStatus.Closed || !path || node.selected) {
      event.preventDefault();
      return;
    }

    history.push(path);
    scrollViewRef.current.instance.scrollTo(0);

    if (!isLarge || menuStatus === MenuStatus.TemporaryOpened) {
      setMenuStatus(MenuStatus.Closed);
      event.stopPropagation();
    }
  }, [history, menuStatus, isLarge]);

  return (
    <div className="side-nav-outer-toolbar">
      <Header
        className="layout-header"
        menuToggleEnabled
        toggleMenu={toggleMenu}
        title={title}
      />
      <Drawer
        className={['drawer', patchCssClass].join(' ')}
        position="before"
        closeOnOutsideClick={onOutsideClick}
        openedStateMode={isLarge ? 'shrink' : 'overlap'}
        revealMode={isXSmall ? 'slide' : 'expand'}
        minSize={isXSmall ? 0 : 60}
        maxSize={250}
        shading={!isLarge}
        opened={menuStatus !== MenuStatus.Closed}
        template="menu"
      >
        <div className="container">
          <ScrollView ref={scrollViewRef} className="layout-body with-footer">
            <div className="content">
              {React.Children.map(children, (item) => item)}
            </div>
          </ScrollView>
        </div>
        <Template name="menu">
          <SideNavigationMenu
            compactMode={menuStatus === MenuStatus.Closed}
            selectedItemChanged={onNavigationChanged}
            openMenu={temporaryOpenMenu}
            onMenuReady={onMenuReady}
          />
        </Template>
      </Drawer>
    </div>
  );
}

SideNavOuterToolbar.propTypes = {
  title: PropTypes.string.isRequired,
};

const MenuStatus = {
  Closed: 1,
  Opened: 2,
  TemporaryOpened: 3,
};
