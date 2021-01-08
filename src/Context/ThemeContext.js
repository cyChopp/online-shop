import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

import React, { createContext, useContext, useState } from "react";

export const ThemeContext = createContext();
export const ThemeUpdateContext = createContext();

export const useUpdateContext = () => {
  return useContext(ThemeUpdateContext);
};

const DarkProvider = ({ children }) => {
  const [isThemeToggle, setIsThemeToggle] = useState(true);

  const changeTheme = () => {
    setIsThemeToggle((themeTrigger) => !themeTrigger);
    console.log("theme changed");
  };

  const theme = createMuiTheme({
    palette: {
      type: isThemeToggle ? "dark" : "light",
    },
  });

  return (
    <ThemeContext.Provider value={isThemeToggle}>
      {" "}
      {/* PASS */}
      <ThemeUpdateContext.Provider value={[changeTheme,isThemeToggle]}>
        {" "}
        {/* TOGGLE THEME CONTEXT*/}
        <ThemeProvider theme={theme}>
          {" "}
          {/*MATERIAL UI THEME PROVIDER */}
          {children}
        </ThemeProvider>
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
};

export default DarkProvider;
