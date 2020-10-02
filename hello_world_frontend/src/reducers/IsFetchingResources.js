import {
    FETCH_RESOURCES_REQUEST,
    FETCH_RESOURCES_FAILURE,
    FETCH_RESOURCES_SUCCESS,
    FETCH_PROFILE_INFO_REQUEST,
    FETCH_PROFILE_INFO_REQUEST_FAILURE,
    FETCH_PROFILE_INFO_REQUEST_SUCCESS
} from '../constants/ActionTypes';

export default function IsFetchingResources(state = false, action) {
    switch(action.type) {
        case FETCH_RESOURCES_REQUEST :
        case FETCH_PROFILE_INFO_REQUEST:
            return true;
        case FETCH_RESOURCES_FAILURE :
        case FETCH_PROFILE_INFO_REQUEST_FAILURE :
        case FETCH_RESOURCES_SUCCESS :
        case FETCH_PROFILE_INFO_REQUEST_SUCCESS :
            return false;
        default:
            return state;
    }
};