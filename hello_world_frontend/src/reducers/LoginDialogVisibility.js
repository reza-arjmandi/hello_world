import { 
    OPEN_LOGIN_DIALOG, 
    CLOSE_LOGIN_DIALOG 
} from '../constants/ActionTypes';

export default function LoginDialogVisibility(state = false, action) {
    switch(action.type) {
        case OPEN_LOGIN_DIALOG :
            return true;
        case CLOSE_LOGIN_DIALOG :
                return false;
        default:
            return state;
    }
};