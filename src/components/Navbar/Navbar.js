import { AppBar, Badge, IconButton, Toolbar, Typography } from '@material-ui/core'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

import React from 'react'

import useStyles from './styles'

const Navbar = () => {

    const classes = useStyles();

    return (
        <>
            <AppBar position='fixed' className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography variant='h6' className={classes.title} color="inherit">
                        Breeab-shop
                    </Typography>
                    <div className={classes.grow}/> {/* this div will take as much space as it need to fill the space between  Title and Buttons */}
                    <div className={classes.button}>
                        <IconButton aria-label='Show cart items' color='inherit'>
                            <Badge badgeContent={2} color="secondary"></Badge>
                            <ShoppingBasketIcon/>
                        </IconButton>
                    </div>

                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar
