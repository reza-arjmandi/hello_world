import {
    FETCH_SERVER_STATUS_REQUEST,
    FETCH_SERVER_STATUS_FAILURE,
    FETCH_SERVER_STATUS_SUCCESS
} from '../constants/ActionTypes';

export default function IsServerStarted(state = false, action) {
    switch(action.type) {
        case FETCH_SERVER_STATUS_SUCCESS:
            return action.is_started;
        case FETCH_SERVER_STATUS_REQUEST:
        case FETCH_SERVER_STATUS_FAILURE:
        default:
            return state;
    }
}