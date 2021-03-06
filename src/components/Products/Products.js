import { CssBaseline, Grid } from "@material-ui/core";


import React from "react";
import { useCartContext } from "../../Context/CartContext";
import Product from "./Product/Product";

import useStyles from './styles'

const Products = () => {

  const classes =useStyles();

  const [cart,products] =useCartContext()



  return (
    <>
        <CssBaseline/>
    <main className={classes.content} >
    <div className={classes.toolbar} />
      <Grid container justify="center" spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id}  xs={12} sm={6} md={4} lg={3}>
          <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </main>
    </>
  );

};

export default Products;
