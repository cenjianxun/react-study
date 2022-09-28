import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart, subItemFromCart, clearItemFromCart } from '../../store/cart/cart.action';
import {
    CheckoutItemContainer,
    ImageContainer,
    BaseSpan,
    Quantity,
    Arrow,
    Value,
    RemoveButton,
  } from './checkout-item.styles';

const CheckoutItem = ({cartItem}) => {
    const { name, imageUrl, price, quantity} = cartItem
    const cartItems = useSelector(selectCartItems)
    const dispatch = useDispatch()
    const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem))
    const subItemHandler = () => dispatch(subItemFromCart(cartItems, cartItem))
    const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, cartItem))
    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`} />
            </ImageContainer>
            <BaseSpan>{name}</BaseSpan>
            <Quantity>
                <Arrow onClick={subItemHandler}>
                    &#10094;
                </Arrow>
                <Value className='value'>{quantity}</Value>
                <Arrow className='arrow' onClick={addItemHandler}>
                    &#10095;
                </Arrow>
            </Quantity>
            <BaseSpan>{price}</BaseSpan>
            <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )
}

export default CheckoutItem