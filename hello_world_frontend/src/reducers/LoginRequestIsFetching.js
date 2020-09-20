import { 
    LOGIN_REQUEST, 
    LOGIN_REQUEST_FAILURE,
    LOGIN_REQUEST_SUCCESS,
    EMAIL_VERIFICATION_REQUEST ,
    EMAIL_VERIFICATION_REQUEST_FAILURE,
    EMAIL_VERIFICATION_REQUEST_SUCCESS,
} from '../constants/ActionTypes';

export default function LoginRequestIsFetching(state = false, action) {
    switch(action.type) {
        case LOGIN_REQUEST:
        case EMAIL_VERIFICATION_REQUEST:
            return true;
        case LOGIN_REQUEST_SUCCESS :
        case LOGIN_REQUEST_FAILURE :
        case EMAIL_VERIFICATION_REQUEST_FAILURE :
        case EMAIL_VERIFICATION_REQUEST_SUCCESS :
                return false;
        default:
            return state;
    }
};