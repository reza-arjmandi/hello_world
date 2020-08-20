import {
    FETCH_MENU_LIST_SUCCESS,
    FETCH_MENU_LIST_FAILURE
} from '../constants/ActionTypes';

export default function MenuList(state=[], action) {
    switch(action.type) {
        case FETCH_MENU_LIST_SUCCESS:
            return action.response;
        case FETCH_MENU_LIST_FAILURE:
        default:
            return state;
    }
};
