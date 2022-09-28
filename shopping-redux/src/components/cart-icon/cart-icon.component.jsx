import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'
import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';
import { CartIconContainer, ItemCount } from './cart-icon.styles'

const CartIcon = () => {
    const dispatch = useDispatch()
    const cartCount = useSelector(selectCartCount)
    const isCartOpen = useSelector(selectIsCartOpen)
    // 需求是：当菜单打开，收起它；当菜单收起，打开它
    const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen))
    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon className='shopping-icon' />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon