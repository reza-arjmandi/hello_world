import {
    LOGIN,
} from '../constants/ActionTypes';

export default function Profile(state = null, action) {
    switch(action.type) {
        case LOGIN:
            return action.response["profileObj"];
        default:
            return state;
    }
}