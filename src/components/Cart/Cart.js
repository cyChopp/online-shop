import {
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
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
      <Box container spacing={3}>
        {cart.line_items.map((item) => (
          <Grid item xs={12} sm={12} key={item.id}>
          <Divider/>

            <CartItem
              item={item}
              onHandleAddCartQuantity={handleUpdateCartQuantity}
              onHandleRemoveFromCart={handleRemoveFromCart}
            />
          </Grid>
        ))}
      </Box>
      <div className={classes.cartDetails}>
      <div className={classes.subtotalBreak}>
        <Typography variant="h4">
          Subtotal : {cart.subtotal.formatted_with_symbol}
        </Typography>
        </div>
        <div className={classes.btnBreak}>
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
