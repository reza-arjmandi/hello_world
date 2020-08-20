import { 
    FETCH_MENU_RESOURCES_OPTIONS_REQUEST, 
    FETCH_MENU_RESOURCES_OPTIONS_FAILURE, 
    FETCH_MENU_RESOURCES_OPTIONS_SUCCESS 
} from '../constants/ActionTypes';

export default function IsEnableAddResource(state = false, action) {
    switch(action.type) {
        case FETCH_MENU_RESOURCES_OPTIONS_SUCCESS :
            if (!action.response.hasOwnProperty('actions')){
                return false
            }
            if (!action.response['actions'].hasOwnProperty('POST')){
                return false
            }
            return true;
        case FETCH_MENU_RESOURCES_OPTIONS_REQUEST :
        case FETCH_MENU_RESOURCES_OPTIONS_FAILURE :
                return false;
        default:
            return state;
    }
};