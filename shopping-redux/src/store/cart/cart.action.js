import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";

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
    const existCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToSub.id)

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

const clearCartItem = (cartItems, cartItemToClear) => 
    cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id)

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const subItemFromCart = (cartItems, cartItemFromSub) => {
    const newCartItems = subCartItem(cartItems, cartItemFromSub)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const clearItemFromCart = (cartItems, cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}


export const setIsCartOpen = (boolean) => 
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean)