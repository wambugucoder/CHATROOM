import jwt_decode from 'jwt-decode';
import { CLEANUP, INCOMING_CREATE_ROOM_MESSAGE, LOGIN_USER ,LOGOUT_USER, RETRIEVE_ALL_ROOMS} from './ActionType';

export const OauthSuccess=(token)=>dispatch=>{
    localStorage.setItem("chatToken", token);

    // Decode token to get user data
    const decoded=jwt_decode(token);
    dispatch({
        type:LOGIN_USER,
        payload: decoded
})

}
//LOGOUT USER
export const LogOutUser = () => dispatch => {
    // Remove token from local storage
   localStorage.removeItem("chatToken");
 dispatch({
     type:LOGOUT_USER,
     
   })
     // Redirect to login
window.location.href = "/";
   };

export const IncomingCreateRoomMessage = (msg) => dispatch => {
  
 dispatch({
     type:INCOMING_CREATE_ROOM_MESSAGE,
     payload:msg
     
   })
   };
   export const RetrieveAllRooms = (msg) => dispatch => {
  
    dispatch({
        type:RETRIEVE_ALL_ROOMS,
        payload:msg
        
      })
      };
   export const CleanUp = () => dispatch => {
  
    dispatch({
        type:CLEANUP,
        
        
      })
      };