import { 
    LOGIN_REQUEST_SUCCESS,
    LOGIN_REQUEST_FAILURE,
    EMAIL_VERIFICATION_REQUEST_FAILURE, 
    CLEAR_LOGIN_REQUEST_RESULT,
} from '../constants/ActionTypes';

export default function LoginRequestResult(state = null, action) {
    switch(action.type) {
        case LOGIN_REQUEST_SUCCESS :
        case LOGIN_REQUEST_FAILURE :
            return Object.values(action.result)[0];
        case EMAIL_VERIFICATION_REQUEST_FAILURE :
            return Object.values(action.error)[0].toString();
        case CLEAR_LOGIN_REQUEST_RESULT:
            return null;
        default:
            return state;
    }
};