import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Paper,
  Typography,
} from "@material-ui/core";
import AddShoppingCartRoundedIcon from "@material-ui/icons/AddShoppingCartRounded";
import React from "react";
import { useUpdateCartContext } from "../../../Context/CartContext";

import useStyles from "./styles";

const Product = ({ product }) => {
  const classes = useStyles();

  const [fetchProducts, fetchCart, handleAddToCart] = useUpdateCartContext();

  return (
    <Paper square elevation={3} className={classes.root}> {/*Card instead of Paper */}
      <CardMedia
        className={classes.media}
        image={product.media.source}
        title={product.name}
      />
      <CardContent>
        <div className={classes.cardContent}>
          <Typography variant="h5" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h5">
            {product.price.formatted_with_symbol}
          </Typography>
        </div>
        <Typography
          dangerouslySetInnerHTML={{ __html: product.description }}
          variant="body2"
          color="textSecondary"
        />
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <IconButton
          aria-label="Add to cart"
          onClick={() => handleAddToCart(product.id, 1)}
        >
          <AddShoppingCartRoundedIcon />
        </IconButton>
      </CardActions>
    </Paper>
  );
};

export default Product;
