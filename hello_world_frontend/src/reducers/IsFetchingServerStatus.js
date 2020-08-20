import {
    FETCH_SERVER_STATUS_REQUEST,
    FETCH_SERVER_STATUS_FAILURE,
    FETCH_SERVER_STATUS_SUCCESS
} from '../constants/ActionTypes';

export default function IsFetchingServerStatus(state=false, action) {
    switch(action.type) {
        case FETCH_SERVER_STATUS_REQUEST :
            return true;
        case FETCH_SERVER_STATUS_FAILURE :
        case FETCH_SERVER_STATUS_SUCCESS :
            return false;
        default:
            return state;
    }
}