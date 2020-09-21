import {
    EMAIL_VERIFICATION_REQUEST_SUCCESS,
    SET_AUTH_TOKEN,
} from '../constants/ActionTypes';

export default function IsLogin(state = false, action) {
    switch(action.type) {
        case EMAIL_VERIFICATION_REQUEST_SUCCESS:
        case SET_AUTH_TOKEN :
            if(action.token === null) {
                return false;
            }
            return true;
        default:
            return state;
    }
}