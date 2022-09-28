import { USER_ACTION_TYPES } from "./user.types"

const INITIAL_STATE = {
    currentUser: null,
    isLoading: false,
    error: null,
}

export const userReducer = (state = INITIAL_STATE, action) => {
    const {type, payload} = action

    switch(type) {
        case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
            return { ...state, currentUser: payload }
        case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
            return { ...state, currentUser: null }
        case USER_ACTION_TYPES.SIGN_IN_FAILED:
            return { ...state, error: payload }
        case USER_ACTION_TYPES.SIGN_UP_FAILED:
            return { ...state, error: payload }
        case USER_ACTION_TYPES.SIGN_OUT_FAILED:
            return { ...state, error: payload }
        default: 
            // 因为redux返回所有状态，所以如果不是user的话就保持不变。
            return state
    }
} 