import { 
    LOGIN_REQUEST_SUCCESS,
    LOGIN_REQUEST_FAILURE,
    EMAIL_VERIFICATION_REQUEST_FAILURE, 
    EMAIL_VERIFICATION_REQUEST_SUCCESS,
    CLEAR_LOGIN_REQUEST_RESULT,
} from '../constants/ActionTypes';

export default function LoginRequestResult(state = null, action) {
    switch(action.type) {
        case LOGIN_REQUEST_SUCCESS :
        case LOGIN_REQUEST_FAILURE :
        case EMAIL_VERIFICATION_REQUEST_FAILURE :
            return Object.values(action.result)[0];
        case EMAIL_VERIFICATION_REQUEST_SUCCESS:
            if(Object.keys(action.result) !== "token") {
                return state;
            }
            return Object.values(action.result)[0];
        case CLEAR_LOGIN_REQUEST_RESULT:
            return null;
        default:
            return state;
    }
};