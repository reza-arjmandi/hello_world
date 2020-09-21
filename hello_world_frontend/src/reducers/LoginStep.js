import { 
    LOGIN_REQUEST_SUCCESS, 
    EMAIL_VERIFICATION_REQUEST_SUCCESS,
    SET_AUTH_TOKEN,
} from '../constants/ActionTypes';

export default function LoginStep(state = 0, action) {
    switch(action.type) {
        case LOGIN_REQUEST_SUCCESS :
            return action.result['detail'] === 'A login token has been sent to your email.' ? 1 : state;
        case EMAIL_VERIFICATION_REQUEST_SUCCESS :
            return 2;
        case SET_AUTH_TOKEN :
            if(action.token === null) {
                return 0;
            }
            return state;
        default:
            return state;
    }
};