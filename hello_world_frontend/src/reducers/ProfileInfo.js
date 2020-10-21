import { 
    FETCH_PROFILE_INFO_REQUEST, 
    FETCH_PROFILE_INFO_REQUEST_FAILURE, 
    FETCH_PROFILE_INFO_REQUEST_SUCCESS,
    SEND_PROFILE_INFO_REQUEST,
    SEND_PROFILE_INFO_REQUEST_SUCCESS,
    SEND_PROFILE_INFO_REQUEST_FAILURE,
} from '../constants/ActionTypes';

export default function ProfileInfo(state = null, action) {
    switch(action.type) {
        case FETCH_PROFILE_INFO_REQUEST_SUCCESS :
            return action.result['results'][0];
        case SEND_PROFILE_INFO_REQUEST_SUCCESS :
            return action.result;
        case FETCH_PROFILE_INFO_REQUEST :
        case SEND_PROFILE_INFO_REQUEST :
        case FETCH_PROFILE_INFO_REQUEST_FAILURE :
        case SEND_PROFILE_INFO_REQUEST_FAILURE :
                return null;
        default:
            return state;
    }
};