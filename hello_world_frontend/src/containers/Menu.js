import { connect } from 'react-redux';
import Menu from '../components/Menu';
import {reactLocalStorage} from 'reactjs-localstorage';

import {
    close_menu, 
    open_menu,
    click_menu,
    set_auth_token,
    set_email,
    open_login_dialog,
    } from '../actions'
import {
    fetch_menu_resources,
    fetch_menu_resources_options,
    fetch_profile_info,
} from '../api'

const map_state_to_props = state => ({
    title: state.MenuTitle, 
    is_log_in: state.IsLogin, 
    email: state.Email, 
    menu_list: state.MenuList,
    menu_is_open: state.MenuIsOpen, 
});

const map_dispatch_to_props = dispatch => ({
    on_close_menu: () => dispatch(close_menu()),
    open_menu: () => dispatch(open_menu()),
    on_menu_clicked: (menu_title, resource_link) => {
        dispatch(click_menu(menu_title));

        if(menu_title == "profile") {
            dispatch(fetch_profile_info("profile"));
            return;
        }
        
        dispatch(fetch_menu_resources_options(resource_link));
        dispatch(fetch_menu_resources(resource_link));
    },
    open_login_dialog: () => dispatch(open_login_dialog()),
    logout: (response) => {
        reactLocalStorage.remove("token");
        reactLocalStorage.remove("email");
        dispatch(set_auth_token(null));
        dispatch(set_email(null));
    },
});

export default connect(
    map_state_to_props,
    map_dispatch_to_props
)(Menu);