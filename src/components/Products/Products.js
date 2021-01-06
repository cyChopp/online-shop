import { Grid, Paper } from "@material-ui/core";
import React from "react";
import Product from "./Product/Product";

const Products = () => {
  const products = [
    { id: 1, name: "Computer", description: "Gaming ",price:'$ 14.25' },
    { id: 2, name: "Car", description: "Fast Car" ,price:'$1544.25'},
    { id: 3, name: "Jacket", description: "lether" ,price:'$ 43.55'},
    { id: 4, name: "Jeans", description: "High Quality" ,price:'$ 64.00'},
    { id: 5, name: "Pick", description: "One" ,price:'$ 14.25'},
    { id: 6, name: "Jarsey", description: "Warriors",price:'$ 14.00' },
  ];
  return (
    <main>
      <Grid container justify="center" spacing={4}>
        {products.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
          <Product product={product}/>
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Products;
