import { 
    FETCH_ENGLISH_CLASS_BY_ID_REQUEST, 
    FETCH_ENGLISH_CLASS_BY_ID_REQUEST_FAILURE, 
    FETCH_ENGLISH_CLASS_BY_ID_REQUEST_SUCCESS,
} from '../constants/ActionTypes';

export default function SelectedEnglishClass(state = null, action) {
    switch(action.type) {
        case FETCH_ENGLISH_CLASS_BY_ID_REQUEST_SUCCESS :
            return action.result;
        case FETCH_ENGLISH_CLASS_BY_ID_REQUEST :
        case FETCH_ENGLISH_CLASS_BY_ID_REQUEST_FAILURE :
            return null;
        default:
            return state;
    }
};