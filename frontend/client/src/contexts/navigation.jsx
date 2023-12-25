import React, {
  useState, createContext, useContext, useEffect, useMemo,
} from 'react';
import PropTypes from 'prop-types';

const NavigationContext = createContext({});
const useNavigation = () => useContext(NavigationContext);

function NavigationProvider(props) {
  const [navigationData, setNavigationData] = useState({});
  const memoNavData = useMemo(() => ({ navigationData, setNavigationData }), [navigationData]);

  return (
    <NavigationContext.Provider
      value={memoNavData}
      {...props}
    />
  );
}

function withNavigationWatcher(Component) {
  return function NavigationWatcher(props) {
    NavigationWatcher.propTypes = {
      match: PropTypes.object.isRequired,
    };

    const { match } = props;
    const { setNavigationData } = useNavigation();

    useEffect(() => {
      setNavigationData({ currentPath: match.path });
    }, [match.path, setNavigationData]);

    return React.createElement(Component, props);
  };
}

export { NavigationProvider, useNavigation, withNavigationWatcher };
