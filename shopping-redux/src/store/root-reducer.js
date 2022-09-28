import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer";
import { categoriesReducer } from "./categories/category.reducer";
import { cartReducer } from "./cart/cart.reducer";

//一人触发 全家更新（但没触发的储存地址仍然不变）变的是这个rootReduceer对象
export const rootReducer = combineReducers({
    user: userReducer,
    categories: categoriesReducer,
    cart: cartReducer,
})