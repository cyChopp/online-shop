import { Button, Container, Grid, Typography } from '@material-ui/core'
import React from 'react'
import CartItem from './CartItem/CartItem';

import useStyles from './styles'

const Cart = ({cart}) => {
    const isEmpty = !cart.line_items;

    const classes = useStyles();

    const EmptyCart = ()=>(
         <Typography variant='subtitle1'>You have no items in your cart !</Typography>
    );

    const FilledCard = ()=>(
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((item)=>(
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem item={item}/>
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cartDetails}>
                    <Typography variant='h4'>Subtotal :  {cart.subtotal.formatted_with_symbol}</Typography>
                    <div>
                        <Button className={classes.emptyButton} size='large' type='button' variant='contained' color='secondary'>Empty cart</Button>
                        <Button className={classes.checkoutButton} size='large' type='button' variant='contained' color='primary'>Checkout</Button>
                    </div>
            </div>
        </>
    )

    if(!cart.line_items){
        return <div>Loading...</div>
    } 

    return (
        <Container>
                <div className={classes.toolbar}/>
                <Typography className={classes.title} variant='h4' gutterBottom>Your shopping cart</Typography>
                {isEmpty ? <EmptyCart/> : <FilledCard/>}
        </Container>
    )
}

export default Cart
