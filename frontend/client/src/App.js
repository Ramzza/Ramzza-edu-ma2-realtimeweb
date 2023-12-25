/* eslint-disable react/jsx-filename-extension */
import 'devextreme/dist/css/dx.common.css';
import './themes/generated/theme.base.css';
import './themes/generated/theme.additional.css';
import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import './dx-styles.scss';
import LoadPanel from 'devextreme-react/load-panel';
import { NavigationProvider } from './contexts/navigation';
import { AuthProvider, useAuth } from './contexts/auth';
import { useScreenSizeClass } from './utils/media-query';
import Content from './pages/Content';
import UnauthenticatedContent from './pages/UnauthenticatedContent';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadPanel visible />;
  }

  if (user && user.username) {
    return <Content />;
  }

  return <UnauthenticatedContent />;
}

function AppComponent() {
  const screenSizeClass = useScreenSizeClass();

  return (
    <Router>
      <AuthProvider>
        <NavigationProvider>
          <div className={`app ${screenSizeClass}`}>
            <App />
          </div>
        </NavigationProvider>
      </AuthProvider>
    </Router>
  );
}

export default AppComponent;
