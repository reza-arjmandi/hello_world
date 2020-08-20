import {
    FETCH_RESOURCES_REQUEST,
    FETCH_RESOURCES_FAILURE,
    FETCH_RESOURCES_SUCCESS
} from '../constants/ActionTypes';

export default function IsFetchingResources(state = false, action) {
    switch(action.type) {
        case FETCH_RESOURCES_REQUEST :
            return true;
        case FETCH_RESOURCES_FAILURE :
        case FETCH_RESOURCES_SUCCESS :
            return false;
        default:
            return state;
    }
};