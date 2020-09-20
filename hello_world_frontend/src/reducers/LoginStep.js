import { 
    LOGIN_REQUEST_SUCCESS, 
    EMAIL_VERIFICATION_REQUEST_SUCCESS,
} from '../constants/ActionTypes';

export default function LoginStep(state = 0, action) {
    switch(action.type) {
        case LOGIN_REQUEST_SUCCESS :
            return action.result['detail'] === 'A login token has been sent to your email.' ? 1 : state;
        case EMAIL_VERIFICATION_REQUEST_SUCCESS :
            if(Object.keys(action.result) !== "token") {
                return state;
            }
            return 2;
        default:
            return state;
    }
};