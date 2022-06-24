import React, {createContext} from 'react';

interface User {
  id: string;
  name: string;
}

interface UserContextProps {
  user: User;
}

const UserContext = createContext({} as UserContextProps);

// Default react component
export const UserProvider = ({children}: {children: React.ReactNode}) => {
  const user = {
    id: '1',
    name: 'John Doe',
  } as User;

  return <UserContext.Provider value={{user}}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  if (!UserContext)
    throw new Error('UserContext must be used inside a UserProvider');

  return UserContext;
};
