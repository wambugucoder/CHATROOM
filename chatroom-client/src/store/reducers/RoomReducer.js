import { CLEANUP, INCOMING_CREATE_ROOM_MESSAGE, RETRIEVE_ALL_ROOMS } from "../actions/ActionType";

const INITIAL_STATE = {
    createRoomMessage:{},
    rooms:[]
};
 
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case INCOMING_CREATE_ROOM_MESSAGE:
            return {...state,
            createRoomMessage:action.payload
            }
            case CLEANUP:
                return {...state,
                createRoomMessage:{}
                }
                case RETRIEVE_ALL_ROOMS:
                    return {...state,
                    rooms:action.payload
                    }
        default:
            return state
    }
}