import { connect } from 'react-redux';
import Page from '../components/Page';
import {
    update_log,
    delete_log,
    fetch_menu_resources,
    send_profile_info,
} from '../api';

import {
    change_page_number} from '../actions';

const map_state_to_props = state => ({
    is_fetching: state.IsFetchingResources,
    page_name: state.MenuTitle, 
    post_options: state.PostOptions,
    page_data: state.PageData,
    page_number: state.PageNumber,
    is_login: state.IsLogin,
    profile_request_is_fetching: state.IsFetchingProfileRequest,
    profile_info: state.ProfileInfo,
    is_updating_profile_info_success: state.IsFetchingProfileRequestSucceeded,
});

const map_dispatch_to_props = dispatch => ({
    update_resource: (device_name, log) => dispatch(update_log(device_name, log)),
    delete_resource: (device) => dispatch(delete_log(device)),
    change_page: (number, resource_link) => {
        dispatch(change_page_number(number));
        dispatch(fetch_menu_resources(resource_link));
    },
    send_profile_info_handle: (
        profile_url, user_type, timezone, skype_link, Avatar) => {
        dispatch(
            send_profile_info(
                profile_url, user_type, timezone, skype_link, Avatar));
    }
});

export default connect(
    map_state_to_props,
    map_dispatch_to_props
)(Page);