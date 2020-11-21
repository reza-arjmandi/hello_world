import {
    FETCH_ENGLISH_CLASSES_REQUEST_SUCCESS,
    FETCH_ENGLISH_CLASSES_REQUEST_FAILURE,
} from '../constants/ActionTypes';

export default function EnglishClasses(state={'results': []}, action) {
    switch(action.type) {
        case FETCH_ENGLISH_CLASSES_REQUEST_SUCCESS:
            return action.result;
        case FETCH_ENGLISH_CLASSES_REQUEST_FAILURE:
        default:
            return state;
    }
};