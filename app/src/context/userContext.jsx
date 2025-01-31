import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null);
  const [refreshReservations, setRefreshReservations] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUserData(storedUser);
      setToken(storedToken);
    }
  }, []);

  const login = (user, token) => {
    setUserData(user);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUserData(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

 
  const triggerReservationRefresh = () => {
    setRefreshReservations(prev => !prev);
  };

  return (
    <UserContext.Provider value={{ 
      userData, 
      token, 
      login, 
      logout, 
      refreshReservations, 
      triggerReservationRefresh
    }}>
      {children}
    </UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
