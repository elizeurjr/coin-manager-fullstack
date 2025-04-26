<<<<<<< HEAD
import { createContext } from 'react';

import useLocalStorage from '../hooks/useLocalStorage';

const UserContext = createContext();
export default UserContext;

export function UserProvider({ children }) {
  const [userData, setUserData] = useLocalStorage('userData', {});

  return <UserContext.Provider value={{ userData, setUserData }}>{children}</UserContext.Provider>;
}
=======
import { createContext } from 'react';

import useLocalStorage from '../hooks/useLocalStorage';

const UserContext = createContext();
export default UserContext;

export function UserProvider({ children }) {
  const [userData, setUserData] = useLocalStorage('userData', {});

  return <UserContext.Provider value={{ userData, setUserData }}>{children}</UserContext.Provider>;
}
>>>>>>> f8635ec35210507233f94112cb7aa20c22387894
