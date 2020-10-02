import {
    SEND_PROFILE_INFO_REQUEST,
    SEND_PROFILE_INFO_REQUEST_FAILURE,
    SEND_PROFILE_INFO_REQUEST_SUCCESS
} from '../constants/ActionTypes';

export default function IsFetchingProfileRequest(state = false, action) {
    switch(action.type) {
        case SEND_PROFILE_INFO_REQUEST :
            return true;
        case SEND_PROFILE_INFO_REQUEST_FAILURE :
        case SEND_PROFILE_INFO_REQUEST_SUCCESS :
            return false;
        default:
            return state;
    }
};