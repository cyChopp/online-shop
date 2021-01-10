import {
  Button,
  Container,
  CssBaseline,
  Grid,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useCartContext } from "../../Context/CartContext";
import CartUpdateContextProvider, {
  useCartUpdateContext,
} from "../../Context/CartUpdateContext";
import CartItem from "./CartItem/CartItem";

import useStyles from "./styles";

const Cart = () => {
  const [cart, products, setCart] = useCartContext();
  const [
    handleUpdateCartQuantity,
    handleRemoveFromCart,
    handleEmptyCart,
    handleCaptureCheckout,
  ] = useCartUpdateContext();

  const classes = useStyles();

  const isEmpty = !cart.line_items;

  const EmptyCart = () => (
    <Typography variant="subtitle1">
      You have no items in your cart !{" "}
      <Link to="/" className={classes.link}>
        Go to the main page
      </Link>
    </Typography>
  );

  const FilledCard = () => (
    <div className={classes.content}>
      <Grid container spacing={3}>
        {cart.line_items.map((item) => (
          <Grid item xs={12} sm={4} key={item.id}>
            <CartItem
              item={item}
              onHandleAddCartQuantity={handleUpdateCartQuantity}
              onHandleRemoveFromCart={handleRemoveFromCart}
            />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cartDetails}>
        <Typography variant="h4">
          Subtotal : {cart.subtotal.formatted_with_symbol}
        </Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            onClick={handleEmptyCart}
          >
            Empty cart
          </Button>
          <Button
            component={NavLink}
            to="/checkout"
            className={classes.checkoutButton}
            size="large"
            type="button"
            variant="contained"
            color="primary"
          >
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );

  if (!cart.line_items) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <CssBaseline />
      <Container>
        <div className={classes.toolbar} />
        <Typography className={classes.title} variant="h4" gutterBottom>
          Your shopping cart
        </Typography>
        {isEmpty ? <EmptyCart /> : <FilledCard />}
      </Container>
    </>
  );
};

export default Cart;
