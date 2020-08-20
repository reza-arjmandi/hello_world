import { 
    FETCH_MENU_RESOURCES_OPTIONS_REQUEST, 
    FETCH_MENU_RESOURCES_OPTIONS_FAILURE, 
    FETCH_MENU_RESOURCES_OPTIONS_SUCCESS 
} from '../constants/ActionTypes';

export default function PostOptions(state = null, action) {
    switch(action.type) {
        case FETCH_MENU_RESOURCES_OPTIONS_SUCCESS :
            if (!action.response.hasOwnProperty('actions')){
                return null
            }
            if (!action.response['actions'].hasOwnProperty('POST')){
                return null
            }
            return action.response['actions']['POST'];
        case FETCH_MENU_RESOURCES_OPTIONS_REQUEST :
        case FETCH_MENU_RESOURCES_OPTIONS_FAILURE :
                return null;
        default:
            return state;
    }
};