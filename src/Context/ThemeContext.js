import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

import blueGrey from "@material-ui/core/colors/blueGrey";
import lightGreen from "@material-ui/core/colors/lightGreen";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";

import React, { createContext, useContext, useState } from "react";

export const ThemeContext = createContext();
export const ThemeUpdateContext = createContext();

export const useUpdateContext = () => {
  return useContext(ThemeUpdateContext);
};

const DarkProvider = ({ children }) => {
  const [isThemeToggle, setIsThemeToggle] = useState(false);

  const changeTheme = () => {
    setIsThemeToggle((themeTrigger) => !themeTrigger);
    console.log("theme changed");
  };

  // const palette = {
  // type: isThemeToggle ? 'dark' : 'light',

  // dark: {
  //   background: {
  //     default: "#000000",
  //   },
  // },
  // light: {
  //   background: {
  //     default: "#ffffff",
  //   },

  // },

  //     type: theme.paletteType,
  //     background: {
  //       default: isThemeToggle ? '#000' : '#fff',
  //     },

  // };

  // const theme = createMuiTheme({ palette });

  const theme = createMuiTheme({
    palette: {
      type: isThemeToggle ? "dark" : "light",
      primary: {
        main: "#fff",
      },
      dark: {
        background: {
          default: "#nnn",
        },
        secondary: {
          main: "#fff",
        },
      },
      light: {
        background: {
          default: "#ppp",
        },
      },
    },
    // primary: {
    //   main:  blueGrey[300],
    // },
    // secondary: {
    //   main: '#f44336',
    // },
    primary: {
      light: blueGrey[300],
      main: blueGrey[500],
      dark: blueGrey[700],
      background: blue,
    },
    secondary: {
      light: lightGreen[300],
      main: lightGreen[500],
      dark: lightGreen[700],
      background: blue,
    },
  });

  // const theme = createMuiTheme({ palette });

  // const theme = createMuiTheme({
  //   palette: {
  //     type:'dark',
  //     // type:isThemeToggle ? 'dark' : 'light',
  //     dark: {
  //       background: {
  //           default: "#000000"
  //       }
  //   },
  //   light: {
  //       background: {
  //           default: "#ffffff"
  //       }
  //   }
  // background:{
  //   paper:lightGreen[700],
  //   light: blueGrey[300],
  //   dark: lightGreen[700],

  // },

  // primary: {
  //   main:  blueGrey[300],
  // },
  // secondary: {
  //   main: '#f44336',
  // },
  // primary: {
  //   light: blueGrey[300],
  //   main: blueGrey[500],
  //   dark: blueGrey[700],
  //   background: blue ,

  // },
  // secondary: {
  //   light: lightGreen[300],
  //   main: lightGreen[500],
  //   dark: lightGreen[700],
  //   background: blue ,

  // },
  // type: isThemeToggle ? "dark" : "light",
  //   },
  // });

  return (
    <ThemeContext.Provider value={isThemeToggle}>
      {" "}
      {/* PASS */}
      <ThemeUpdateContext.Provider value={[changeTheme, isThemeToggle]}>
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
