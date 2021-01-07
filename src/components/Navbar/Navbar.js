import {
  AppBar,
  Badge,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";

import React from "react";
import { NavLink, useLocation } from "react-router-dom";

import {useUpdateContext} from '../Context/ThemeContext'

import useStyles from "./styles";

const Navbar = ({ totalItems }) => {
  const classes = useStyles();
  const location = useLocation();
  const toggleTheme =  useUpdateContext();


  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography
            component={NavLink}
            to="/"
            variant="h6"
            className={classes.title}
            color="inherit"
          >
            Breeab-shop
          </Typography>
          <div className={classes.grow} />{" "}
          {/* this div will take as much space as it need to fill the space between  Title and Buttons */}
          <div className={classes.toggleTheme} >
          <button  onClick={toggleTheme}>Toggle Theme</button>
          </div>
          <div className={classes.button}>
            {location.pathname === "/" && (
              <NavLink to="/cart">
                <IconButton
                  component={NavLink}
                  to="/cart"
                  aria-label="Show cart items"
                  color="inherit"
                >
                  <Badge badgeContent={totalItems} color="secondary"></Badge>
                  <ShoppingBasketIcon fontSize="large" />
                </IconButton>
              </NavLink>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
