import {reactLocalStorage} from 'reactjs-localstorage';

import {
    LOGIN_REQUEST,
    EMAIL_VERIFICATION_REQUEST_SUCCESS,
    SET_EMAIL,
} from '../constants/ActionTypes';

export default function Email(state = null, action) {
    switch(action.type) {
        case LOGIN_REQUEST:
            return action.email;
        case EMAIL_VERIFICATION_REQUEST_SUCCESS:
            reactLocalStorage.set('email', state);
            return state;
        case SET_EMAIL:
            return action.email;
        default:
            return state;
    }
}