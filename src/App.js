import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navbar, Products, Cart } from "./components";
import CartProvider from "./Context/CartContext";
import CartUpdateContextProvider from "./Context/CartUpdateContext";
import DarkProvider from "./Context/ThemeContext";

function App() {
  return (
    <Router>
      <DarkProvider>
        <CartProvider>
          {/* <div> */}
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Products />
            </Route>
            <Route exact path="/cart">
              <CartUpdateContextProvider>
                <Cart />
              </CartUpdateContextProvider>
            </Route>
          </Switch>
          {/* </div> */}
        </CartProvider>
      </DarkProvider>
    </Router>
  );
}

export default App;
