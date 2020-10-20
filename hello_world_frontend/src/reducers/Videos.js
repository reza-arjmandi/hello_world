import {
    FETCH_VIDEOS_REQUEST_SUCCESS,
    FETCH_VIDEOS_REQUEST_FAILURE,
    FETCH_RESOURCES_SUCCESS,
    FETCH_RESOURCES_FAILURE
} from '../constants/ActionTypes';

export default function Videos(state=null, action) {
    switch(action.type) {
        case FETCH_VIDEOS_REQUEST_SUCCESS:
        case FETCH_RESOURCES_SUCCESS:
            return action.result;
        case FETCH_VIDEOS_REQUEST_FAILURE:
        case FETCH_RESOURCES_FAILURE:
        default:
            return state;
    }
};
