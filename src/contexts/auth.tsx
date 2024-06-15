import React from "react";
import { User } from "../database/model";
import { usePocketBase } from "./pocketbase";

export interface AuthContextType {
  user: User | null;
  token: string | null;
  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  userSignInOAuth2: (provider: string) => Promise<void>;
  getAvatar: (user: User) => string;
  signout: () => void;
}

export const AuthContext = React.createContext<AuthContextType>({
  user: null,
  token: null,
  setToken: () => {},
  setUser: () => {},
  userSignInOAuth2: () => Promise.resolve(),
  getAvatar: () => "",
  signout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [token, setToken] = React.useState<string | null>(null);

  const pocketBase = usePocketBase();

  const userSignInOAuth2 = async (provider: string) => {
    const w = window.open();
    pocketBase.authStore.clear();
    const authData = await pocketBase.collection("users").authWithOAuth2({
      provider,
      urlCallback: (url) => {
        if (w) w.location.href = url;
      },
    });

    setToken(authData.token);
    setUser(authData.record as unknown as User);
  };

  const getAvatar = (user: User) => {
    return pocketBase.getFileUrl(user, user.avatar);
  };

  const signout = () => {
    pocketBase.authStore.clear();
    setUser(null);
    setToken(null);
  };
  React.useEffect(() => {
    if (pocketBase.authStore.isValid) {
      setToken(pocketBase.authStore.token);
      setUser(pocketBase.authStore.model as User);
    }
  }, [pocketBase, pocketBase.authStore]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        userSignInOAuth2,
        getAvatar,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return React.useContext(AuthContext);
}
