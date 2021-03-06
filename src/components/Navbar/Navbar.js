import {
  AppBar,
  Badge,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";

import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useCartContext } from "../../Context/CartContext";

import { useUpdateContext } from "../../Context/ThemeContext";

import DarkModeToggle from "react-dark-mode-toggle";

import useStyles from "./styles";
import './nav.css'

const Navbar = () => {
  const classes = useStyles();
  const location = useLocation();
  const [changeTheme, isThemeToggle] = useUpdateContext();

  const [cart, products] = useCartContext();


  return (
    <>
      <AppBar position="fixed" className={isThemeToggle? classes.appBarDark : classes.appBar} color="inherit">
        <Toolbar>
          <Typography
            component={NavLink}
            to="/"
            variant="h6"
            className={isThemeToggle?classes.titleDark : classes.title}
            color="inherit"
          >
            Breeab
          </Typography>
          <div className={classes.grow} />{" "}
          {/* this div will take as much space as it need to fill the space between  Title and Buttons */}
         

    <div class="toggle-btn" id="_1st-toggle-btn">
    <div onClick={changeTheme}>
      <input type="checkbox"/>
      <span></span>
      </div>
    </div>


          <div className={classes.button}>
            {location.pathname === "/" && (
              <NavLink to="/cart">
                <IconButton
                  component={NavLink}
                  to="/cart"
                  aria-label="Show cart items"
                  // color="inherit"
                >
                  <Badge
                    badgeContent={cart.total_items}
                    color="secondary"
                  ></Badge>
                  <ShoppingBasketIcon fontSize='large'  className={isThemeToggle ? classes.cartButtonDark : classes.cartButtonLight}/>
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
