import React, { createContext, useState, useContext } from "react";

// Create the Admin Context
const AdminContext = createContext();

// Custom hook to use the Admin Context
export const useAdmin = () => {
  return useContext(AdminContext);
};

// Provider component to wrap around components that need access to isAdmin state
export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false); // Default to false, change based on login

  return (
    <AdminContext.Provider value={{ isAdmin, setIsAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};
