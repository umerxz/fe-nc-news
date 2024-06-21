import { createContext, useState } from 'react';
import { getUserByUsername } from '../api/api';

export const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);

  const loginUser = (username) => {
    return getUserByUsername(username)
      .then(({data}) => {
        setUser(data.user)
        return Promise.resolve(data);
      })
      .catch((err)=>{
        return Promise.reject(err)
      })
  }
  const logout = () => {
    setUser(null)
  } 

  return (
  <UserContext.Provider value={{ user, setUser, loginUser, logout }}>
    {children}
  </UserContext.Provider>
  );
}
