import { 
    FETCH_PROFILE_AVATAR_REQUEST, 
    FETCH_PROFILE_AVATAR_REQUEST_FAILURE, 
    FETCH_PROFILE_AVATAR_REQUEST_SUCCESS,
} from '../constants/ActionTypes';

export default function ProfileAvatar(state = null, action) {
    switch(action.type) {
        case FETCH_PROFILE_AVATAR_REQUEST_SUCCESS :
            return action.result;
        case FETCH_PROFILE_AVATAR_REQUEST :
        case FETCH_PROFILE_AVATAR_REQUEST_FAILURE :
                return null;
        default:
            return state;
    }
};