import { 
    OPEN_ADD_NEW_RESOURCE_DIALOG, 
    CLOSE_ADD_NEW_RESOURCE_DIALOG 
} from '../constants/ActionTypes';

export default function AddNewResourceDialogVisibility(state = false, action) {
    switch(action.type) {
        case OPEN_ADD_NEW_RESOURCE_DIALOG :
            return true;
        case CLOSE_ADD_NEW_RESOURCE_DIALOG :
                return false;
        default:
            return state;
    }
};