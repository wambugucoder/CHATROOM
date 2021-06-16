import {  LOGIN_USER, LOGOUT_USER } from "../actions/ActionType";
const INITIAL_STATE = {
    isLoading:false,
    isAuthenticated:false,
    user:{}
};
 
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_USER:
        return{...state,
                isLoading:false,
                isAuthenticated:true,
                user:action.payload
                }
         case LOGOUT_USER:
           return{...state,
                isLoading:false,
                isAuthenticated:false,
                user:{}
             }
        default:
            return state
    }
}