import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core'
import React from 'react'
import useStyles from './styles'

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const CartItem = ({item}) => {

   const classes = useStyles()

    return (
        <Card>
            <CardMedia image={item.media.source} alt={item.name} className={classes.media}/>
            <CardContent className={classes.cardContent}>
                <Typography variant='h4'>{item.name}</Typography>
                <Typography variant='h5'>{item.line_total.formatted_with_symbol}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <div className={classes.buttons}>
                    <Button type='button' size='small'><AddIcon/></Button>
                    <Typography>{item.quantity}</Typography>
                    <Button type='button' size='small'><RemoveIcon/></Button>
                </div>
                <Button variant='contained' type='button' color='primary'>Remove</Button>
            </CardActions>
        </Card>
    )
}

export default CartItem
