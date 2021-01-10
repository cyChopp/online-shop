import React, { createContext, useContext, useState } from 'react'
import { commerce } from '../lib/commerce'
import { useCartContext } from './CartContext'

const CartUpdateContext = createContext()
const CartUpdateContextCheckout = createContext()

export const useCartUpdateContext = ()=>{
    return useContext(CartUpdateContext)
}
export const useCartUpdateContextCheckout = ()=>{
    return useContext(CartUpdateContextCheckout)
}


const CartUpdateContextProvider = ({children}) => {

    const [cart, products,setCart] = useCartContext()
    const [order ,setOrder] = useState({})
    const [errorMsg,setErrorMsg] = useState('')

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

    const refreshCart = async()=>{
        const newCart = await commerce.cart.refresh()
        setCart(newCart)
    }

    const handleCaptureCheckout = async (ckeckoutTokenId,newOrder)=>{
        try{
              const incomingOrder = await commerce.checkout.capture(ckeckoutTokenId,newOrder)
              setOrder(incomingOrder)
              refreshCart()
              console.log('YAAAAAS')
        }catch(error){
            setErrorMsg(error.data.error.message)
        }
    }

    return (
        <CartUpdateContext.Provider value={[handleUpdateCartQuantity,handleRemoveFromCart,handleEmptyCart,handleCaptureCheckout]}>
            <CartUpdateContextCheckout.Provider value={[order,errorMsg]}>
            {children}
            </CartUpdateContextCheckout.Provider>
        </CartUpdateContext.Provider>
    )
}

export default CartUpdateContextProvider

        // <CartUpdateContext.Provider value={[handleUpdateCartQuantity,handleRemoveFromCart,handleEmptyCart,handleCaptureCheckout,order,errorMsg]}>
