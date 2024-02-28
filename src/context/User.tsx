import { createContext, useContext } from 'react';
import type ProviderType from '../types/Provider';
import { useAuth0 } from "@auth0/auth0-react";

interface UserContextType {
  user: any;
  isAuthenticated: boolean;
  loginWithRedirect: () => void;
  logout: () => void;
}

const UserContext = createContext({} as UserContextType);

export function useUserContext(){
  return useContext(UserContext);
}

export function UserProvider({ children }: ProviderType){
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <UserContext.Provider value={{
      user, isAuthenticated, loginWithRedirect, logout
    }}>
      {children}
    </UserContext.Provider>
  )
}
