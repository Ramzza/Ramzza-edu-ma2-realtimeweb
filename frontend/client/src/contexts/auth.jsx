import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from 'react';
import { getUser, signIn as sendSignInRequest } from '../api/auth';

function AuthProvider(props) {
  const [user, setUser] = useState();
  const [homeUser, setHomeUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      const result = await getUser();
      if (result.isOk) {
        setUser(result.data);
        setHomeUser(result.data);
      }

      setLoading(false);
    }());
  }, []);

  const signIn = useCallback(async (email, password) => {
    const result = await sendSignInRequest(email, password);
    if (result.isOk) {
      setUser(result.data);
      setHomeUser(result.data);
    }

    return result;
  }, []);

  const signOut = useCallback(() => {
    setUser();
  }, []);

  const updateUser = useCallback((oUser) => {
    setUser(oUser);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        updateUser,
        signIn,
        signOut,
        loading, homeUser, setHomeUser
      }}
      {...props}
    />
  );
}

const AuthContext = createContext({});
const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
