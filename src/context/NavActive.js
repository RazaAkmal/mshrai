import { createContext, useContext, useState } from "react";

export const NavBarContext = createContext({});
export const NavActiveProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(!open);
  const value = { open, handleClick };
  return (
    <NavBarContext.Provider value={value}>{children}</NavBarContext.Provider>
  );
};
export const useNavBarContext = () => useContext(NavBarContext);
