import { createContext, useState, useEffect } from 'react';
import { AppContext } from './AppContext';
import axios from '../api/axiosInstance';
import { doctors } from "../assets/assets";




const AppContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const currencySymbol = '$';

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axios.get('/api/user/profile', { withCredentials: true });
        if (res.data) {
          setUser(res.data);
          setToken(true);
          localStorage.setItem('isLoggedIn', 'true');
        }
      } catch (err) {
        setUser(null);
        setToken(false);
        localStorage.removeItem('isLoggedIn');
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, []);


  const value = {
    token,
    setToken,
    user,
    setUser,
    doctors,
    currencySymbol,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
