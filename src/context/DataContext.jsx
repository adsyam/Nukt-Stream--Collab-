//this DataContext file will be used for our global variables
//that will be used throughout our components

import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const DataContext = createContext({});

export const useDataContext = () => {
  return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
  const [sidebar, setSidebar] = useState(false); //state of sidebar
  const [userSidebar, setUserSidebar] = useState(false);
  const [isActive, setIsActive] = useState(false); //state of navbar
  const [dropDown, setDropDown] = useState(false); //state of dropdown
  const [modal, setModal] = useState(false); //state of feedback modal
  const location = useLocation().pathname; //get the current page location
  const searchParams = new URLSearchParams(window.location.search);

  //show sidebar if menu button is clicked
  const showSidebar = () => setSidebar(!sidebar);
  const showUserSidebar = () => setUserSidebar(!userSidebar);

  //give navbar a black bg once user scrolldown
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    });
  });

  const handleDropDown = () => {
    dropDown === false ? setDropDown(true) : setDropDown(false);
  };

  return (
    <DataContext.Provider
      value={{
        showSidebar,
        sidebar,
        userSidebar,
        showUserSidebar,
        isActive,
        location,
        dropDown,
        handleDropDown,
        searchParams,
        modal,
        setModal,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
