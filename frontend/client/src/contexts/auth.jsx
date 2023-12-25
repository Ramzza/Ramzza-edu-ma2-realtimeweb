import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
  useMemo,
} from 'react';
import { getUser, signIn as sendSignInRequest } from '../api/auth';
import ChatSocket from '../utils/chat-socket';

function AuthProvider(props) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function setCurrentUser() {
      const result = await getUser();
      if (result.isOk) {
        setUser(result.data);
      }

      setLoading(false);
    }());
  }, []);

  const signIn = useCallback(async (email, password) => {
    const result = await sendSignInRequest(email, password);
    if (result.isOk) {
      ChatSocket().registerUserToChat(result.data.username);
      setUser(result.data);
    }

    return result;
  }, []);

  const signOut = useCallback(() => {
    setUser();
  }, []);

  const updateUser = useCallback((oUser) => {
    setUser(oUser);
  }, []);

  const memoUser = useMemo(
    () => ({
      user,
      updateUser,
      signIn,
      signOut,
      loading,
    }),
    [user, loading],
  );

  return (
    <AuthContext.Provider
      value={memoUser}
      {...props}
    />
  );
}

const AuthContext = createContext({});
const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
