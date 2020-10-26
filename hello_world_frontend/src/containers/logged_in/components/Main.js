import { connect } from 'react-redux';
import Main from '../../../logged_in/components/Main'
import {
    send_profile_info,
    fetch_profile_info,
    fetch_profile_avatar,
    
} from "../../../api"

import persons from "../../../stories/dummy_data/persons";

const map_state_to_props = state => ({
    persons: persons,
    profile_info: state.ProfileInfo,
    is_login: state.IsLogin,
    profile_avatar: state.ProfileAvatar,
});

const map_dispatch_to_props = dispatch => ({
    send_profile_info_handle: (
        profile_url, user_type, timezone, skype_link, Avatar) => {
        dispatch(
            send_profile_info(
                profile_url, user_type, timezone, skype_link, Avatar));
    },
    fetch_profile_info: () => {
        dispatch(fetch_profile_info());
    },
    fetch_profile_avatar: (avatar) => {
        dispatch(fetch_profile_avatar(avatar));
    },
});

export default connect(
    map_state_to_props,
    map_dispatch_to_props
)(Main);