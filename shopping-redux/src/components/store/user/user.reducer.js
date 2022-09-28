import { USER_ACTION_TYPES } from "./user.types"

const INITIAL_STATE = {
    currentUser: null,
}

export const userReducer = (state = INITIAL_STATE, action) => {
    const {type, payload} = action

    switch(type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }
        default: 
            // 因为redux返回所有状态，所以如果不是user的话就保持不变。
            return state
    }
} 