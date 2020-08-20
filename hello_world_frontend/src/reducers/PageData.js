import {
    FETCH_RESOURCES_SUCCESS,
    FETCH_RESOURCES_FAILURE
} from '../constants/ActionTypes';

export default function PageData(state=null, action) {
    switch(action.type) {
        case FETCH_RESOURCES_SUCCESS:
            return action.response;
        case FETCH_RESOURCES_FAILURE:
        default:
            return state;
    }
};
