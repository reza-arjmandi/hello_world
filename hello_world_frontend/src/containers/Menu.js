import { connect } from 'react-redux';
import Menu from '../components/Menu';
import {
    close_menu, 
    open_menu,
    click_menu,
    login,
    } from '../actions'
import {
    fetch_menu_resources,
    fetch_menu_resources_options,
    } from '../api'

const map_state_to_props = state => ({
    title: state.MenuTitle, 
    is_log_in: state.IsLogin, 
    profile: state.Profile, 
    menu_list: state.MenuList,
    menu_is_open: state.MenuIsOpen, 
});

const map_dispatch_to_props = dispatch => ({
    on_close_menu: () => dispatch(close_menu()),
    open_menu: () => dispatch(open_menu()),
    on_menu_clicked: (menu_title, resource_link) => {
        dispatch(click_menu(menu_title));
        dispatch(fetch_menu_resources_options(resource_link));
        dispatch(fetch_menu_resources(resource_link));
    },
    login: (response) => dispatch(login(response)),
});

export default connect(
    map_state_to_props,
    map_dispatch_to_props
)(Menu);