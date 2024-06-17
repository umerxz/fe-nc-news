import { createContext,useEffect,useState } from 'react';
import { getUserByUsername } from '../api/api';

export const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  useEffect(()=>{
    getUserByUsername("tickle122")
    .then((data)=>{
      setUser({data})
    })
  },[])

  return (
  <UserContext.Provider value={{ user, setUser }}>
    {children}
  </UserContext.Provider>
  );
}
