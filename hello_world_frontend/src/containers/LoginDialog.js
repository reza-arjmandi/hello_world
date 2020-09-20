import { connect } from 'react-redux';
import LoginDialog from "../components/LoginDialog";
import { 
    close_login_dialog,
    clear_login_request_result } from '../actions';
import { 
    login,
    send_verification_code 
} from '../api';

const map_state_to_props = state => ({
    open: state.LoginDialogVisibility,
    login_step: state.LoginStep,
    login_request_result: state.LoginRequestResult,
    login_request_is_fetching: state.LoginRequestIsFetching,
    email: state.Email,
});

const map_dispatch_to_props = (dispatch) => ({
    on_close: () => { dispatch(close_login_dialog()) },
    login: (email) => { 
        dispatch(login(email));
        dispatch(clear_login_request_result()); },
    send_verification_code: (eamil, token) => {
        dispatch(send_verification_code(eamil, token));
        dispatch(clear_login_request_result());},
});

export default connect(
    map_state_to_props, 
    map_dispatch_to_props
)(LoginDialog);