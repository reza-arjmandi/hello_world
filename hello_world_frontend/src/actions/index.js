import * as types from '../constants/ActionTypes';


export const fetch_resources_request = () => ({
    type: types.FETCH_RESOURCES_REQUEST,
});

export const fetch_resources_failure = (error) => ({
    type: types.FETCH_RESOURCES_FAILURE,
    error
});

export const fetch_resources_success = (result) => ({
    type: types.FETCH_RESOURCES_SUCCESS,
    result
});

export const change_page_number = (number) => ({
    type: types.CHANGE_PAGE_NUMBER,
    number
});

export const set_auth_token = (token) => ({
    type: types.SET_AUTH_TOKEN,
    token
});

export const set_email = (email) => ({
    type: types.SET_EMAIL,
    email
});

export const login_request = (email) => ({ 
    type: types.LOGIN_REQUEST,
    email
});

export const login_request_success = (result) => ({ 
    type: types.LOGIN_REQUEST_SUCCESS,
    result
});

export const login_request_failure = (error) => ({ 
    type: types.LOGIN_REQUEST_FAILURE,
    error
});

export const email_verification_request = () => ({ 
    type: types.EMAIL_VERIFICATION_REQUEST,
});

export const email_verification_request_success = (result) => ({ 
    type: types.EMAIL_VERIFICATION_REQUEST_SUCCESS,
    result
});

export const email_verification_failure = (error) => ({ 
    type: types.EMAIL_VERIFICATION_REQUEST_FAILURE,
    error
});

export const clear_login_request_result = () => ({ 
    type: types.CLEAR_LOGIN_REQUEST_RESULT,
});

export const send_profile_info_request = () => ({ 
    type: types.SEND_PROFILE_INFO_REQUEST,
});

export const send_profile_info_request_success = (result) => ({ 
    type: types.SEND_PROFILE_INFO_REQUEST_SUCCESS,
    result
});

export const send_profile_info_request_failure = (error) => ({ 
    type: types.SEND_PROFILE_INFO_REQUEST_FAILURE,
    error
});

export const fetch_profile_info_request = () => ({ 
    type: types.FETCH_PROFILE_INFO_REQUEST,
});

export const fetch_profile_info_request_success = (result) => ({ 
    type: types.FETCH_PROFILE_INFO_REQUEST_SUCCESS,
    result
});

export const fetch_profile_info_request_failure = (error) => ({ 
    type: types.FETCH_PROFILE_INFO_REQUEST_FAILURE,
    error
});

export const fetch_profile_avatar_request = () => ({ 
    type: types.FETCH_PROFILE_AVATAR_REQUEST,
});

export const fetch_profile_avatar_request_success = (result) => ({ 
    type: types.FETCH_PROFILE_AVATAR_REQUEST_SUCCESS,
    result
});

export const fetch_profile_avatar_request_failure = (error) => ({ 
    type: types.FETCH_PROFILE_AVATAR_REQUEST_FAILURE,
    error
});

export const fetch_blog_posts_request = () => ({ 
    type: types.FETCH_BLOG_POSTS_REQUEST,
});

export const fetch_blog_posts_request_success = (result) => ({ 
    type: types.FETCH_BLOG_POSTS_REQUEST_SUCCESS,
    result
});

export const fetch_blog_posts_request_failure = (error) => ({ 
    type: types.FETCH_BLOG_POSTS_REQUEST_FAILURE,
    error
});

export const fetch_videos_request = () => ({ 
    type: types.FETCH_VIDEOS_REQUEST,
});

export const fetch_videos_request_success = (result) => ({ 
    type: types.FETCH_VIDEOS_REQUEST_SUCCESS,
    result
});

export const fetch_videos_request_failure = (error) => ({ 
    type: types.FETCH_VIDEOS_REQUEST_FAILURE,
    error
});

export const remove_profile_info = () => ({ 
    type: types.REMOVE_PROFILE_INFO,
});

export const fetch_english_classes_request = () => ({ 
    type: types.FETCH_ENGLISH_CLASSES_REQUEST,
});

export const fetch_english_classes_request_success = (result) => ({ 
    type: types.FETCH_ENGLISH_CLASSES_REQUEST_SUCCESS,
    result
});

export const fetch_english_classes_request_failure = (error) => ({ 
    type: types.FETCH_ENGLISH_CLASSES_REQUEST_FAILURE,
    error
});

export const create_english_class_request = () => ({ 
    type: types.CREATE_ENGLISH_CLASS_REQUEST,
});

export const create_english_class_request_success = (result) => ({ 
    type: types.CREATE_ENGLISH_CLASS_REQUEST_SUCCESS,
    result
});

export const create_english_class_request_failure = (error) => ({ 
    type: types.CREATE_ENGLISH_CLASS_REQUEST_FAILURE,
    error
});

export const fetch_english_class_by_id_request = () => ({ 
    type: types.FETCH_ENGLISH_CLASS_BY_ID_REQUEST,
});

export const fetch_english_class_by_id_request_success = (result) => ({ 
    type: types.FETCH_ENGLISH_CLASS_BY_ID_REQUEST_SUCCESS,
    result
});

export const fetch_english_class_by_id_request_failure = (error) => ({ 
    type: types.FETCH_ENGLISH_CLASS_BY_ID_REQUEST_FAILURE,
    error
});

export const update_english_class_request = () => ({ 
    type: types.UPDATE_ENGLISH_CLASS_REQUEST,
});

export const update_english_class_request_success = (result) => ({ 
    type: types.UPDATE_ENGLISH_CLASS_REQUEST_SUCCESS,
    result
});

export const update_english_class_request_failure = (error) => ({ 
    type: types.UPDATE_ENGLISH_CLASS_REQUEST_FAILURE,
    error
});

export const delete_english_class_request = () => ({ 
    type: types.DELETE_ENGLISH_CLASS_REQUEST,
});

export const delete_english_class_request_success = (result) => ({ 
    type: types.DELETE_ENGLISH_CLASS_REQUEST_SUCCESS,
    result
});

export const delete_english_class_request_failure = (error) => ({ 
    type: types.DELETE_ENGLISH_CLASS_REQUEST_FAILURE,
    error
});