import userAction from '../user-actions.redux';
import {addItemToCart} from './cart.util';
const INITIAL_STATE = {
    hidden: true,
    cart: []
}
const cartReducer = (state= INITIAL_STATE, action) => {
    switch (action.type) {
        case userAction.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            }
            break;
        case userAction.ADD_ITEM:
            return {
                ...state,
                cart: addItemToCart (state.cart, action.payload)
            }
        default:
            return state;
    }
}

export default cartReducer;