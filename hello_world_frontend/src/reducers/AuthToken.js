import {reactLocalStorage} from 'reactjs-localstorage';

import { 
    SET_AUTH_TOKEN, 
    EMAIL_VERIFICATION_REQUEST_SUCCESS,
} from '../constants/ActionTypes';

export default function AuthToken(state = null, action) {
    switch(action.type) {
        case SET_AUTH_TOKEN :
            return action.token;
        case EMAIL_VERIFICATION_REQUEST_SUCCESS :
            reactLocalStorage.set('token', Object.values(action.result)[0]);
            return Object.values(action.result)[0];
        default:
            return state;
    }
};