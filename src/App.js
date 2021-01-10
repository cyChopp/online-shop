import { Paper } from "@material-ui/core";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navbar, Products, Cart } from "./components";
import Checkout from "./components/CheckoutForm/Checkout/Checkout";
import CartProvider from "./Context/CartContext";
import CartUpdateContextProvider from "./Context/CartUpdateContext";
import DarkProvider from "./Context/ThemeContext";

function App() {
  return (
    <Router>
      <DarkProvider>
        <CartProvider>

          <Navbar />
          
          <Switch>
            <Route exact path="/">
              <Products />
            </Route>{" "}
            <CartUpdateContextProvider>
              <Route exact path="/cart">
                <Cart />
              </Route>
              <Route path="/checkout">
                <Checkout />
              </Route>
            </CartUpdateContextProvider>
          </Switch>

        </CartProvider>
      </DarkProvider>
    </Router>
  );
}

export default App;
