import React, { createContext, useContext } from 'react'
import { commerce } from '../lib/commerce'
import { useCartContext } from './CartContext'

const CartUpdateContext = createContext()

export const useCartUpdateContext = ()=>{
    return useContext(CartUpdateContext)
}

const CartUpdateContextProvider = ({children}) => {

    const [cart, products,setCart] = useCartContext()

    const handleUpdateCartQuantity =async (productId,quantity)=>{
        const response = await commerce.cart.update(productId,{quantity})
        setCart(response.cart)
    }

    const handleRemoveFromCart = async (productId)=>{
        const response = await commerce.cart.remove(productId)
        setCart(response.cart)
    }

    const handleEmptyCart = async ()=>{
        const response = await commerce.cart.empty();

        setCart(response.cart)

    }

    return (
        <CartUpdateContext.Provider value={[handleUpdateCartQuantity,handleRemoveFromCart,handleEmptyCart]}>
            {children}
        </CartUpdateContext.Provider>
    )
}

export default CartUpdateContextProvider
