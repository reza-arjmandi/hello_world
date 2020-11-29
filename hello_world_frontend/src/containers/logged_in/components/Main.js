import { connect } from 'react-redux';
import {reactLocalStorage} from 'reactjs-localstorage';

import Main from '../../../logged_in/components/Main'

import {
    set_auth_token,
    set_email,
    remove_profile_info,
}
from "../../../actions"

import {
    send_profile_info,
    fetch_profile_info,
    fetch_profile_avatar,
    fetch_english_classes,
    create_english_class,
    fetch_class_by_id,
    update_english_class,
    delete_english_class,
    subscribe_english_class,
} from "../../../api"

import persons from "../../../stories/dummy_data/persons";

const map_state_to_props = state => ({
    persons: persons,
    profile_info: state.ProfileInfo,
    is_login: state.IsLogin,
    profile_avatar: state.ProfileAvatar,
    class_contents: state.EnglishClasses,
    selected_english_class: state.SelectedEnglishClass,
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
    log_out: () => {
        reactLocalStorage.remove("token")
        dispatch(set_auth_token(null));

        reactLocalStorage.remove("email")
        dispatch(set_email(null));

        dispatch(remove_profile_info());
    },
    fetch_english_classes: (url = null) => {
        dispatch(fetch_english_classes(url));
    },
    create_english_class: (english_class) => {
        dispatch(create_english_class(english_class));
    },
    fetch_class_by_id: (class_id) => {
        dispatch(fetch_class_by_id(class_id));
    },
    update_english_class: (url, english_class)=> {
        dispatch(update_english_class(url,english_class));
    },
    delete_english_class : (url) => {
        dispatch(delete_english_class(url));
    },
    subscribe_english_class: (url) => {
        dispatch(subscribe_english_class(url));
    }
});

export default connect(
    map_state_to_props,
    map_dispatch_to_props
)(Main);