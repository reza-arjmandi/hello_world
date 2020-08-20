import {
    LOGIN,
} from '../constants/ActionTypes';

export default function IsLogin(state = false, action) {
    switch(action.type) {
        case LOGIN:
            return true;
        default:
            return state;
    }
}