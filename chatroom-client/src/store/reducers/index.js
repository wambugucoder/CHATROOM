import { combineReducers } from 'redux';
import OauthReducer from './OauthReducer';
import RoomReducer from './RoomReducer';

const reducers = combineReducers({
  auth:OauthReducer,
  room:RoomReducer
});

export default reducers;
