import React, {
  useEffect, useRef, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import TreeView from 'devextreme-react/tree-view';
import * as events from 'devextreme/events';
import { navigation } from '../../constants/app-navigation';
import { useNavigation } from '../../contexts/navigation';
import { useScreenSize } from '../../utils/media-query';
import './side-navigation-menu.scss';

export default function SideNavigationMenu(props) {
  const {
    // eslint-disable-next-line react/prop-types
    children, selectedItemChanged, openMenu, compactMode, onMenuReady,
  } = props;

  const { isLarge } = useScreenSize();
  function normalizePath() {
    return navigation.map((navigationItem) => {
      const item = { ...navigationItem };
      if (item.path && !/^\//.test(item.path)) {
        item.path = `/${item.path}`;
      }
      return { ...item, expanded: isLarge };
    });
  }

  const items = useMemo(
    normalizePath,
    [],
  );

  const {
    navigationData: { currentPath },
  } = useNavigation();

  const treeViewRef = useRef();
  const wrapperRef = useRef();
  const getWrapperRef = useCallback(
    (element) => {
      const prevElement = wrapperRef.current;
      if (prevElement) {
        events.off(prevElement, 'dxclick');
      }

      wrapperRef.current = element;
      events.on(element, 'dxclick', (e) => {
        openMenu(e);
      });
    },
    [openMenu],
  );

  useEffect(() => {
    const treeView = treeViewRef.current && treeViewRef.current.instance;
    if (!treeView) {
      return;
    }

    if (currentPath !== undefined) {
      treeView.selectItem(currentPath);
      treeView.expandItem(currentPath);
    }

    if (compactMode) {
      treeView.collapseAll();
    }
  }, [currentPath, compactMode]);

  return (
    <div
      className="dx-swatch-additional side-navigation-menu"
      ref={getWrapperRef}
    >
      {children}
      <div className="menu-container">
        <TreeView
          ref={treeViewRef}
          items={items}
          keyExpr="path"
          selectionMode="single"
          focusStateEnabled={false}
          expandEvent="click"
          onItemClick={selectedItemChanged}
          onContentReady={onMenuReady}
          width="100%"
        />
      </div>
    </div>
  );
}

SideNavigationMenu.propTypes = {
  selectedItemChanged: PropTypes.func.isRequired,
  openMenu: PropTypes.func.isRequired,
  compactMode: PropTypes.bool.isRequired,
  onMenuReady: PropTypes.func.isRequired,
};
