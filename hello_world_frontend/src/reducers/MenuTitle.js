import {
    CLICK_MENU,
} from '../constants/ActionTypes';

export default function MenuTitle(state="Hello, World!", action) {
    switch(action.type) {
        case CLICK_MENU:
            return action.menu_title;
        default:
            return state;
    }
};
