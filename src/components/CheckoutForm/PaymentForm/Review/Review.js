import { Button, List, ListItem, ListItemText, Typography } from "@material-ui/core";
import React from "react";
import { NavLink } from "react-router-dom";

const Review = ({ checkoutToken, }) => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Summary
      </Typography>
      <List disablePadding>
        {checkoutToken.live.line_items.map((product) => (
          <ListItem style={{ padding: "10px 0px" }} key={product.name}>
            <ListItemText
              primary={product.name}
              secondary={`Quantity : ${product.quantity}`}
            ></ListItemText>
            <Typography variant="body2">
              {product.line_total.formatted_with_symbol}
            </Typography>
          </ListItem>
        ))}
        <ListItem style={{ padding: "10px 0px" }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
            {checkoutToken.live.subtotal.formatted_with_symbol}
          </Typography>
        </ListItem>
      </List>
      <Button component={NavLink} to={'/cart'} variant='outlined' color='secondary'>Back</Button>

    </>
  );
};

export default Review;
