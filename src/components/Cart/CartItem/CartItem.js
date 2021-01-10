import { Button, Card, CardActions, CardContent, CardMedia, Paper, Typography } from '@material-ui/core'
import React from 'react'
import useStyles from './styles'

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const CartItem = ({item,onHandleAddCartQuantity,onHandleRemoveFromCart}) => {

   const classes = useStyles()

    return (
        <CardContent className={classes.itemWrapper} square elevation={2}>
        <div>            <CardMedia image={item.media.source} alt={item.name} className={classes.media}/>
</div>
            {/* <div> */}
            <CardContent className={classes.cardContent}>
                <Typography variant='h4'>{item.name}</Typography>
                <Typography variant='h5'>{item.line_total.formatted_with_symbol}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <div className={classes.buttons}>
                    <Button type='button' size='small' onClick={()=>onHandleAddCartQuantity(item.id,item.quantity + 1)}><AddIcon/></Button>
                    <Typography>{item.quantity}</Typography>
                    <Button type='button' size='small' onClick={()=>onHandleAddCartQuantity(item.id,item.quantity - 1)}><RemoveIcon/></Button>
                </div>
                <Button className={classes.emptyButton} variant='contained' type='button' color='primary' onClick={()=>onHandleRemoveFromCart(item.id)} >Remove</Button>
            </CardActions>
            {/* </div> */}
        </CardContent>
    )
}

export default CartItem
