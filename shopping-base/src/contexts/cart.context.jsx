import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
    // 如果cartItems包含productToAdd，找到
    const existCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)

    // 如果找到，增加数量
    if (existCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id 
            ? {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
        )
    }

    // return 新数组（new cartitem）
    return [...cartItems, { ...productToAdd, quantity:1 }]
}

const subCartItem = (cartItems, cartItemToSub) => {
    //找到要移除的cartitem
    const existCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToSub.id)

    // 检查数量是否为1，是就移除
    if (existCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToSub.id)
    } 

    // 减少个数，返回数组
    if (existCartItem) {
        return cartItems.map((cartItem) => cartItem.id === cartItemToSub.id 
            ? {...cartItem, quantity: cartItem.quantity - 1}
            : cartItem
        )
    }
}

const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id)

export const CartContext = createContext({
    isCartOpen: false,
    setIsOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    subItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    total: 0,
})

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartCount(newCartCount);
    }, [cartItems])

    useEffect(() => {
        const newCartTotal = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
        setCartTotal(newCartTotal);
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }

    const subItemToCart = (cartItemToSub) => {
        setCartItems(subCartItem(cartItems, cartItemToSub))
    }


    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear))
    }

    const value = {
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart, 
        subItemToCart, 
        clearItemFromCart, 
        cartItems, 
        cartCount,
        cartTotal,
    }
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}