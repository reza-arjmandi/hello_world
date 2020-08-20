import {
    CHANGE_PAGE_NUMBER,
} from '../constants/ActionTypes';

export default function PageNumber(state=0, action) {
    switch(action.type) {
        case CHANGE_PAGE_NUMBER:
            return action.number;
        default:
            return state;
    }
};
